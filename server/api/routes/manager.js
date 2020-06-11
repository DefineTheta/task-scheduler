var express = require('express');

// Router used to route /api/v1/manager endpoints
var managerRouter = express.Router();

module.exports = function (apiRouter) {
  apiRouter.use('/manager', managerRouter);

  // Create a new manager account
  managerRouter.post('/join', function (req, res) {
    res.json({ account_type: 'manager' });
  });

  // Login a manager account
  managerRouter.post('/login', function (req, res) {
    res.json({ account_type: 'manager' });
  });

  // GET route used to retrive all the workspace a maanger belongs to
  managerRouter.get('/workspaces', function (req, res) {
    var workspaces = [
      { id: 1, name: '🎀 WOTBOS New York' },
      { id: 2, name: '📜 Quest Workspaces' },
      { id: 3, name: '🎶 The Farm SoHo NYC' },
    ];

    res.json(workspaces);
  });

  // GET route used to retrive all the workers in a workspace a maanger belongs to
  managerRouter.get('/workspaces/workers', function (req, res) {
    var workers = [
      { id: 1, name: 'Amy Fischer' },
      { id: 2, name: 'Bob The Builder' },
      { id: 3, name: 'Tigger' },
    ];

    res.json(workers);
  });

  // GET route used to retrive today's tasks
  managerRouter.get('/tasks', function (req, res) {
    if (req.query.timeline == 'today' || req.query.timeline == undefined) {
      let tasks = [
        {
          date: Math.round(new Date().getTime() / 1000),
          tasks: [
            { title: 'This is a manager test task', user: 1, completed: false },
            {
              title: 'You have logged in as the manager',
              user: 1,
              completed: false,
              color: 'red',
            },
            {
              title: 'Muhahaahaha',
              user: 3,
              completed: false,
              color: 'orange',
            },
            { title: 'This one too', user: 2, completed: false, color: 'purple' },
            {
              title: 'Back to me again I should really clean the dishes',
              user: 1,
              completed: false,
              color: 'green',
            },
            { title: ':)', user: 4, completed: false },
          ],
        },
      ];

      res.json(tasks);
    } else if (req.query.timeline == 'week') {
      let today = new Date();

      let tasks = [
        {
          date: Math.round(today.getTime() / 1000),
          tasks: [
            { title: 'This is a test task', user: 1, completed: false },
            {
              title: 'I have to do this taks today',
              user: 1,
              completed: false,
              color: 'red',
            },
            {
              title: 'This task is not assigned to me',
              user: 3,
              completed: false,
              color: 'orange',
            },
            { title: 'This one too', user: 2, completed: false, color: 'purple' },
            {
              title: 'Back to me again I should really clean the dishes',
              user: 1,
              completed: false,
              color: 'green',
            },
            { title: ':)', user: 4, completed: false },
          ],
        },
        {
          date: Math.round(
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 2,
            ).getTime() / 1000,
          ),
          tasks: [
            {
              title: 'This is a task in 2 days',
              user: 1,
              completed: false,
              color: 'red',
            },
            {
              title: 'Looks like it is working',
              user: 1,
              completed: false,
            },
            {
              title: 'This is just dummy data',
              user: 3,
              completed: false,
              color: 'orange',
            },
            { title: 'This one too', user: 2, completed: false, color: 'purple' },
            {
              title: 'So do not worry about it',
              user: 1,
              completed: false,
            },
            { title: ':)', user: 4, completed: false },
          ],
        },
        {
          date: Math.round(
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 3,
            ).getTime() / 1000,
          ),
          tasks: [
            {
              title: 'This is a task in 2 days',
              user: 1,
              completed: false,
              color: 'red',
            },
            {
              title: 'Looks like it is working',
              user: 1,
              completed: false,
            },
            {
              title: 'This is just dummy data',
              user: 3,
              completed: false,
              color: 'orange',
            },
            { title: 'This one too', user: 2, completed: false, color: 'purple' },
            {
              title: 'So do not worry about it',
              user: 1,
              completed: false,
            },
            { title: ':)', user: 4, completed: false },
          ],
        },
        {
          date: Math.round(
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 5,
            ).getTime() / 1000,
          ),
          tasks: [
            {
              title: 'This is a task in 2 days',
              user: 1,
              completed: false,
              color: 'red',
            },
            {
              title: 'Looks like it is working',
              user: 1,
              completed: false,
            },
            {
              title: 'This is just dummy data',
              user: 3,
              completed: false,
              color: 'orange',
            },
            { title: 'This one too', user: 2, completed: false, color: 'purple' },
            {
              title: 'So do not worry about it',
              user: 1,
              completed: false,
            },
            { title: ':)', user: 4, completed: false },
          ],
        },
      ];

      res.json(tasks);
    }
  });
};
