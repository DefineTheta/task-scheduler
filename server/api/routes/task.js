import express from 'express';

// Used to validate any params recieved from client
import { check, query, validationResult } from 'express-validator';

// A poll of connections to MySQL database used to make queries
import MySQLPool from 'Loaders/mysql';

// Import Winston logger instance to log messages to console
import Logger from 'Loaders/logger';

const taskRouter = express.Router();

// Function used to format validation errors (if any)
const validationErrorFormatter = ({ msg }) => {
  return msg;
};

// Custome validator to check if dates are valid
const isDate = (value) => {
  if (value === undefined || value === null) return false;
  if (!value.match(/^\d{2}-\d{2}-\d{4}$/)) return false;
  else return true;
};

export default (baseRouter) => {
  baseRouter.use('/task', taskRouter);

  // POST route used to create a new task
  taskRouter.post(
    '/',
    [
      // Check that task name is of valid length
      check('task_name')
        .isLength({ min: 4, max: 255 })
        .withMessage('Task name must be at least 4 letters'),
      // Check that the task date is a valid date
      check('task_date')
        .custom(isDate)
        .withMessage('Date provided is not in valid format'),
      //Check that assigned worker has a valid worker id
      check('task_worker')
        .isNumeric({ min: 0, max: undefined })
        .withMessage('Assigned user is not valid'),
      // Check that the color is not empty
      check('task_color')
        .isIn(['navy', 'red', 'orange', 'yellow', 'green', 'blue', 'teal', 'purple'])
        .withMessage('Color provided is not allowed'),
    ],
    async (req, res) => {
      let session = req.session;

      const validationErrors = validationResult(req).formatWith(validationErrorFormatter);

      // Check if the user is logged in or not and check if the user is a manager and that workspaceID exists in session
      if (
        session.isUserLoggedIn !== true ||
        session.userType !== 0 ||
        session.workspaceID === undefined
      ) {
        res.status(401).json({ success: false, error: 'Unauthorized access' });
      } else if (validationErrors.isEmpty() === false) {
        res.status(422).json({
          errors: validationErrors.array(),
        });
      } else {
        try {
          // Run a stored procedure to check if current user is actually a part of the workspace
          const [user_rows] = await MySQLPool.query(`CALL IsUserInWorkspace(?,?,?)`, [
            session.workspaceID,
            session.userID,
            0,
          ]);

          // Run a stored procedure to check if assigned worker to task is actually a part of the workspace
          const [worker_rows] = await MySQLPool.query(`CALL IsUserInWorkspace(?,?,?)`, [
            session.workspaceID,
            req.body.task_worker,
            1,
          ]);

          if (user_rows[0][0].count !== 1) {
            res.status(401).json({ error: 'Unauthorized access' });
          } else if (worker_rows[0][0].count !== 1) {
            res.status(422).json({ errors: ['Assigned worker invalid'] });
          } else {
            // Run a stored procedure to create a new task
            const [rows] = await MySQLPool.query('CALL NewTask(?,?,?,?,?)', [
              session.workspaceID,
              req.body.task_worker,
              req.body.task_name,
              req.body.task_color,
              req.body.task_date,
            ]);

            // Check if the task was actually created in database
            if (rows.affectedRows === 0) {
              res.status(400).json({ errors: ['Task was not created'] });
            } else {
              // A way to redirect when using XHTTP
              res.setHeader('xhttp-redirect', '/scheduler');
              res.sendStatus(200);
            }
          }
        } catch (error) {
          Logger.error(error);
          res.status(500).json({ error: 'Internal server error occured' });
        }
      }
    },
  );

  // DELETE route used to delete a task from database
  taskRouter.delete(
    '/',
    [
      // Check that task id is numeric and greater than 0
      check('task_id')
        .isNumeric({ min: 0, max: undefined })
        .withMessage('Invalid task id'),
    ],
    async (req, res) => {
      let session = req.session;

      const validationErrors = validationResult(req).formatWith(validationErrorFormatter);

      // Check if the user is logged in or not and check if the user is a manager and workspace id exists in session
      if (
        session.isUserLoggedIn !== true ||
        session.userType !== 0 ||
        session.workspaceID === undefined
      ) {
        res.status(401).json({ error: 'Unauthorized access' });
      } else if (validationErrors.isEmpty() === false) {
        res.status(422).json({ errors: validationErrors.array() });
      } else {
        try {
          // Run a stored procedure to check if current user is actually a part of the workspace
          const [user_rows] = await MySQLPool.query(`CALL IsUserInWorkspace(?,?,?)`, [
            session.workspaceID,
            session.userID,
            0,
          ]);

          // Check and respond with errors if any
          if (user_rows[0][0].count !== 1) {
            res.status(401).json({ error: 'Unauthorized access' });
          } else {
            // Run a stored procedure to change status of tasks
            const [rows] = await MySQLPool.query('CALL DeleteTask(?,?)', [
              session.workspaceID,
              req.body.task_id,
            ]);

            // Check if the task was actually removed
            if (rows.affectedRows === 0)
              res.status(400).json({ error: 'Task was not deleted' });
            else res.json({ task_id: req.body.task_id });
          }
        } catch (error) {
          Logger.error(error);
          res.status(500).json({ error: 'Internal server error occured' });
        }
      }
    },
  );

  // PUT route to update an existing task
  taskRouter.put(
    '/',
    [
      // Check that task id is numeric and greater than 0
      check('task_id')
        .isNumeric({ min: 0, max: undefined })
        .withMessage('Invalid task id'),
      // Check that task name is of valid length
      check('task_name')
        .isLength({ min: 4, max: 255 })
        .withMessage('Task name must be at least 4 letters'),
      // Check that the task date is a valid date
      check('task_date')
        .custom(isDate)
        .withMessage('Date provided is not in valid format'),
      //Check that assigned worker has a valid worker id
      check('task_worker')
        .isNumeric({ min: 0, max: undefined })
        .withMessage('Assigned user is not valid'),
      // Check that the color is one of the allowed colors
      check('task_color')
        .isIn(['Navy', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Teal', 'Purple'])
        .withMessage('Color provided is not allowed'),
    ],
    async (req, res) => {
      let session = req.session;

      const validationErrors = validationResult(req).formatWith(validationErrorFormatter);

      // Check if the user is logged in or not and check if the user is a manager and workspace id exists in session
      if (
        session.isUserLoggedIn !== true ||
        session.userType !== 0 ||
        session.workspaceID === undefined
      ) {
        res.status(401).json({ success: false, error: 'Unauthorized access' });
      } else if (validationErrors.isEmpty() === false) {
        res.status(422).json({
          success: false,
          errors: validationErrors.array(),
        });
      } else {
        try {
          // Run a stored procedure to check if current user is actually a part of the workspace
          const [user_rows] = await MySQLPool.query(`CALL IsUserInWorkspace(?,?,?)`, [
            session.workspaceID,
            session.userID,
            0,
          ]);

          // Run a stored procedure to check if assigned worker to task is actually a part of the workspace
          const [worker_rows] = await MySQLPool.query(`CALL IsUserInWorkspace(?,?,?)`, [
            session.workspaceID,
            req.body.task_worker,
            1,
          ]);

          // Check and respond with errors if any
          if (user_rows[0][0].count !== 1) {
            res.status(401).json({ error: 'Unauthorized access' });
          } else if (worker_rows[0][0].count !== 1) {
            res.status(422).json({ error: 'Assigned worker invalid' });
          } else {
            // Run a stored procedure to update information of existing tasks
            const [rows] = await MySQLPool.query('CALL UpdateTask(?,?,?,?,?,?)', [
              session.workspaceID,
              req.body.task_id,
              req.body.task_worker,
              req.body.task_name,
              req.body.task_color,
              req.body.task_date,
            ]);

            // Check if the task was actually updated
            if (rows.affectedRows === 0)
              res.status(400).json({ error: 'Task information was not updated' });
            else res.sendStatus(200);
          }
        } catch (error) {
          Logger.error(error);
          res.status(500).json({ error: 'Internal server error occured' });
        }
      }
    },
  );

  // PUT route to mark task as completed
  taskRouter.put(
    '/status',
    [
      // Check that task id is numeric and greater than 0
      check('task_id')
        .isNumeric({ min: 0, max: undefined })
        .withMessage('Invalid task id'),
      // Check that the status is a boolean
      check('task_status').isBoolean().withMessage('Task status needs to be a boolean'),
    ],
    async (req, res) => {
      let session = req.session;

      const validationErrors = validationResult(req).formatWith(validationErrorFormatter);

      // Check if the user is logged in or not and workspace id exists in session
      if (session.isUserLoggedIn !== true || session.workspaceID === undefined) {
        res.status(401).json({ success: false, error: 'Unauthorized access' });
      } else if (validationErrors.isEmpty() === false) {
        res.status(422).json({
          errors: validationErrors.array(),
        });
      } else {
        try {
          // Run a stored procedure to check if current user is actually a part of the workspace
          const [user_rows] = await MySQLPool.query(`CALL IsUserInWorkspace(?,?,?)`, [
            session.workspaceID,
            session.userID,
            session.userType,
          ]);

          // Check and respond with errors if any
          if (user_rows[0][0].count !== 1) {
            res.status(401).json({ error: 'Unauthorized access' });
          } else {
            // Run a stored procedure to change status of tasks
            const [rows] = await MySQLPool.query('CALL SetTaskStatus(?,?,?)', [
              session.workspaceID,
              req.body.task_id,
              req.body.task_status,
            ]);

            // Check if the task was actually updated
            if (rows.affectedRows === 0)
              res.status(400).json({ error: 'Task status was not updated' });
            else res.json({ task_id: req.body.task_id });
          }
        } catch (error) {
          Logger.error(error);
          res.status(500).json({ error: 'Internal server error occured' });
        }
      }
    },
  );

  // GET route used to get all tasks from today
  taskRouter.get(
    '/today',
    [
      // Check that date valid
      query('date').custom(isDate).withMessage('Date provided is not in valid format'),
    ],
    async (req, res) => {
      let session = req.session;

      const validationErrors = validationResult(req).formatWith(validationErrorFormatter);

      // Check if the user is logged in or not
      if (session.isUserLoggedIn !== true || session.workspaceID === undefined) {
        res.status(401).json({ success: false, error: 'Unauthorized access' });
      } else if (validationErrors.isEmpty() === false) {
        res.status(422).json({
          errors: validationErrors.array(),
        });
      } else {
        const onlyCurrentUserTasks = req.query.mine === true ? true : false;

        try {
          // Run a stored procedure to check if current user is actually a part of the workspace
          const [user_rows] = await MySQLPool.query(`CALL IsUserInWorkspace(?,?,?)`, [
            session.workspaceID,
            session.userID,
            session.userType,
          ]);

          if (user_rows[0].length !== 1) {
            res.status(401).json({ error: 'Unauthorized access' });
          } else {
            // Run a stored procedure to get all tasks from today for a specific workspace
            const [rows] = await MySQLPool.query(`CALL GetAllTodayTasks(?,?,?,?)`, [
              session.workspaceID,
              req.query.date,
              onlyCurrentUserTasks,
              session.userID,
            ]);

            res.json({ tasks: rows[0] });
          }
        } catch (error) {
          Logger.error(error);
          res.status(500).json({ error: 'Internal server error occured' });
        }
      }
    },
  );

  // GET route used to get all tasks from comming week
  taskRouter.get(
    '/week',
    [
      // Check that start date valid
      query('start_date')
        .custom(isDate)
        .withMessage('Start date provided is not in valid format'),
      // Check that end date valid
      query('end_date')
        .custom(isDate)
        .withMessage('End date provided is not in valid format'),
    ],
    async (req, res) => {
      let session = req.session;

      const validationErrors = validationResult(req).formatWith(validationErrorFormatter);

      // Check if the user is logged in or not
      if (session.isUserLoggedIn !== true || session.workspaceID === undefined) {
        res.status(401).json({ success: false, error: 'Unauthorized access' });
      } else if (validationErrors.isEmpty() === false) {
        res.status(422).json({
          errors: validationErrors.array(),
        });
      } else {
        const onlyCurrentUserTasks = req.query.mine === true ? true : false;

        try {
          // Run a stored procedure to check if current user is actually a part of the workspace
          const [user_rows] = await MySQLPool.query(`CALL IsUserInWorkspace(?,?,?)`, [
            session.workspaceID,
            session.userID,
            session.userType,
          ]);

          if (user_rows[0].length !== 1) {
            res.status(401).json({ error: 'Unauthorized access' });
          } else {
            // Run a stored procedure to get all tasks from today for a specific workspace
            const [rows] = await MySQLPool.query(`CALL GetAllWeekTasks(?,?,?,?,?)`, [
              session.workspaceID,
              req.query.start_date,
              req.query.end_date,
              onlyCurrentUserTasks,
              session.userID,
            ]);

            res.json({ tasks: rows[0] });
          }
        } catch (error) {
          Logger.error(error);
          res.status(500).json({ error: 'Internal server error occured' });
        }
      }
    },
  );

  // GET route used to get all tasks in a workspace
  taskRouter.get('/all', async (req, res) => {
    let session = req.session;

    // Check if the user is logged in or not
    if (session.isUserLoggedIn !== true || session.workspaceID === undefined) {
      res.status(401).json({ success: false, error: 'Unauthorized access' });
    } else {
      const onlyCurrentUserTasks = req.query.mine === true ? true : false;

      try {
        // Run a stored procedure to check if current user is actually a part of the workspace
        const [user_rows] = await MySQLPool.query(`CALL IsUserInWorkspace(?,?,?)`, [
          session.workspaceID,
          session.userID,
          session.userType,
        ]);

        if (user_rows[0].length !== 1) {
          res.status(401).json({ error: 'Unauthorized access' });
        } else {
          // Run a stored procedure to get all tasks from today for a specific workspace
          const [rows] = await MySQLPool.query(`CALL GetAllTasks(?,?,?)`, [
            session.workspaceID,
            onlyCurrentUserTasks,
            session.userID,
          ]);

          res.json({ tasks: rows[0] });
        }
      } catch (error) {
        Logger.error(error);
        res.status(500).json({ error: 'Internal server error occured' });
      }
    }
  });
};
