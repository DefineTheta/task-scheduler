import express from 'express';

// Used to validate any params recieved from client
import { check, validationResult } from 'express-validator';

// A poll of connections to MySQL database used to make queries
import MySQLPool from 'Loaders/mysql';

// Import Winston logger instance to log messages to console
import Logger from 'Loaders/logger';

const workspaceRouter = express.Router();

// Function used to format validation errors (if any)
const validationErrorFormatter = ({ msg }) => {
  return msg;
};

export default (baseRouter) => {
  baseRouter.use('/workspace', workspaceRouter);

  // PUT route to update current session workspace ID
  workspaceRouter.put(
    '/change',
    [
      // Check that workspace id is numeric and greater than 0
      check('workspace_id').isNumeric({ min: 0, max: undefined }),
    ],
    async (req, res) => {
      let session = req.session;

      const validationErrors = validationResult(req).formatWith(validationErrorFormatter);

      // Check if the user is logged in or not
      if (session.isUserLoggedIn !== true) {
        res.status(401).json({ success: false, error: 'Unauthorized access' });
      } else if (validationErrors.isEmpty() === false) {
        res.status(422).json({
          success: false,
          error: 'Workspace ID is invalid',
        });
      } else {
        // Update session workspace ID and respond with a positive confirmation
        session.workspaceID = req.body.workspace_id;
        // A way to redirect when using XHTTP
        res.setHeader('xhttp-redirect', '/scheduler');
        res.sendStatus(200);
      }
    },
  );

  // GET route used to get workspaces that the user belongs to
  workspaceRouter.get('/', async (req, res) => {
    let session = req.session;

    // Check if the user is logged in or not
    if (session.isUserLoggedIn !== true) {
      res.status(401).json({ success: false, error: 'Unauthorized access' });
    } else {
      try {
        // Run a stored procedure to get all workspace a user belongs to
        const [rows] = await MySQLPool.query(`CALL GetUserWorkspaces(?,?)`, [
          session.userID,
          session.userType,
        ]);

        // If a workspace ID is not set then set it now
        if (session.workspaceID === undefined && rows[0].length > 0) {
          session.workspaceID = rows[0][0].workspace_id;
        }

        res.json({ workspaces: rows[0], active: session.workspaceID });
      } catch (error) {
        Logger.error(error);
        res.status(500).json({ error: 'Internal server error occured' });
      }
    }
  });

  // GET route used to get all workers from a workspace
  workspaceRouter.get('/workers', async (req, res) => {
    let session = req.session;

    // Check if the user is logged in or not and check if the user is a manager
    if (session.isUserLoggedIn !== true || session.userType !== 0) {
      res.status(401).json({ success: false, error: 'Unauthorized access' });
    } else {
      try {
        // Run a stored procedure to get all workers from workspace
        const [rows] = await MySQLPool.query(`CALL GetAllWorkspaceWorkers(?)`, [
          session.workspaceID,
        ]);

        res.json({ workers: rows[0] });
      } catch (error) {
        Logger.error(error);
        res.status(500).json({ error: 'Internal server error occured' });
      }
    }
  });

  // POST route used to create a new workspace
  workspaceRouter.post(
    '/',
    [
      // Check that workspace name is of valid length
      check('workspace_name').isLength({ min: 4, max: 255 }),
    ],
    async (req, res) => {
      let session = req.session;

      const validationErrors = validationResult(req).formatWith(validationErrorFormatter);

      // Check if the user is logged in or not and check if the user is a manager
      if (session.isUserLoggedIn !== true || session.userType !== 0) {
        res.status(401).json({ success: false, error: 'Unauthorized access' });
      } else if (validationErrors.isEmpty() === false) {
        res.status(422).json({
          success: false,
          error: 'Workspace name needs to be greater than 4 letters',
        });
      } else {
        try {
          // Run a stored procedure to create a new workspace
          const [rows] = await MySQLPool.query('CALL CreateNewWorkspace(?,?)', [
            req.body.workspace_name,
            session.userID,
          ]);

          res.json({ success: true });
        } catch (error) {
          Logger.error(error);
          res.status(500).json({ error: 'Internal server error occured' });
        }
      }
    },
  );

  // POST route used to join a workspace
  workspaceRouter.post(
    '/join',
    [
      // Check that workspace id is numeric and greater than 0
      check('workspace_id').isNumeric({ min: 0, max: undefined }),
    ],
    async (req, res) => {
      let session = req.session;

      const validationErrors = validationResult(req).formatWith(validationErrorFormatter);

      // Check if the user is logged in or not
      if (session.isUserLoggedIn !== true) {
        res.status(401).json({ success: false, error: 'Unauthorized access' });
      } else if (validationErrors.isEmpty() === false) {
        res.status(422).json({
          success: false,
          error: 'Workspace ID is invalid',
        });
      } else {
        try {
          // Run a stored procedure to check if current user is actually a part of the workspace
          const [user_rows] = await MySQLPool.query(`CALL IsUserInWorkspace(?,?,?)`, [
            req.body.workspace_id,
            session.userID,
            session.userType,
          ]);

          if (user_rows[0][0].count > 0) {
            res.status(400).json({ error: 'Already in this workspace' });
          } else {
            // Run a stored procedure to join a workspace
            const [rows] = await MySQLPool.query('CALL JoinWorkspace(?,?,?)', [
              req.body.workspace_id,
              session.userID,
              session.userType,
            ]);

            res.sendStatus(200);
          }
        } catch (error) {
          Logger.error(error);
          res.status(500).json({ error: 'Internal server error occured' });
        }
      }
    },
  );

  // POST route used to search for a workspace
  workspaceRouter.post(
    '/search',
    [
      // Check that workspace name is of valid length
      check('workspace_name').isLength({ min: 4, max: 255 }),
    ],
    async (req, res) => {
      let session = req.session;

      const validationErrors = validationResult(req).formatWith(validationErrorFormatter);

      // Check if the user is logged in or not
      if (session.isUserLoggedIn !== true) {
        res.status(401).json({ success: false, error: 'Unauthorized access' });
      } else if (validationErrors.isEmpty() === false) {
        res.status(422).json({
          success: false,
          error: 'Workspace name needs to be greater than 4 letters',
        });
      } else {
        try {
          // Run a stored procedure to join a workspace
          const [rows] = await MySQLPool.query('CALL SearchForWorkspace(?)', [
            `%${req.body.workspace_name}%`,
          ]);

          res.json({ workspaces: rows[0] });
        } catch (error) {
          Logger.error(error);
          res.status(500).json({ error: 'Internal server error occured' });
        }
      }
    },
  );

  // DELETE route used to remove a workspace
  workspaceRouter.delete(
    '/',
    [
      // Check that workspace id is numeric and greater than 0
      check('workspace_id').isNumeric({ min: 0, max: undefined }),
    ],
    async (req, res) => {
      let session = req.session;

      const validationErrors = validationResult(req).formatWith(validationErrorFormatter);

      // Check if the user is logged in or not and check if the user is a manager
      if (session.isUserLoggedIn !== true || session.userType !== 0) {
        res.status(401).json({ success: false, error: 'Unauthorized access' });
      } else if (validationErrors.isEmpty() === false) {
        res.status(422).json({
          success: false,
          error: 'Workspace name needs to be greater than 4 letters',
        });
      } else {
        try {
          // Run a stored procedure to check if current user is actually a part of the workspace
          const [user_rows] = await MySQLPool.query(`CALL IsUserInWorkspace(?,?,?)`, [
            req.body.workspace_id,
            session.userID,
            0,
          ]);

          if (user_rows[0][0].count !== 1) {
            res.status(401).json({ success: false, error: 'Unauthorized access' });
          } else {
            // Run a stored procedure to delete a workspace
            const [rows] = await MySQLPool.query('CALL DeleteWorkspace(?)', [
              req.body.workspace_id,
            ]);

            // If deleted workspace was the active workspace remove it from session
            if (session.workspaceID == req.body.workspace_id)
              session.workspaceID = undefined;

            // Get workspaces manager belongs to
            const [workspace_rows] = await MySQLPool.query(
              'CALL GetUserWorkspaces(?,?)',
              [session.userID, session.userType],
            );

            // Check if there are any workspaces at all
            if (workspace_rows[0].length > 0 && session.workspaceID === undefined) {
              session.workspaceID = workspace_rows[0][0].workspace_id;
            }

            res.json({ workspaces: workspace_rows[0], active: session.workspaceID });
          }
        } catch (error) {
          Logger.error(error);
          res.status(500).json({ error: 'Internal server error occured' });
        }
      }
    },
  );
};
