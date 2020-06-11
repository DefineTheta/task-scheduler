var express = require('express');

// Router used to route /api/v1/worker endpoints
var workerRouter = express.Router();

module.exports = function (apiRouter) {
  apiRouter.use('/worker', workerRouter);

  // Create a new worker account
  workerRouter.post('/join', function (req, res) {
    res.json({ account_type: 'worker' });
  });

  // Login a worker account
  workerRouter.post('/login', function (req, res) {
    res.json({ account_type: 'worker' });
  });

  // GET route used to retrive all the workspace a worker belongs to
  workerRouter.get('/workspaces', function (req, res) {
    var workspaces = [
      { id: 1, name: '🎀 WOTBOS New York' },
      { id: 2, name: '📜 Quest Workspaces' },
      { id: 3, name: '🎶 The Farm SoHo NYC' },
    ];

    res.json(workspaces);
  });

  // GET route used to retrive today's tasks
  workerRouter.get('/tasks', function (req, res) {
    if (req.query.timeline == 'today' || req.query.timeline == undefined) {
      let tasks = [
        {
          date: Math.round(new Date().getTime() / 1000),
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

// [
//   {
//     date: 1591109736,
//     tasks: [
//       { title: 'Hi I am a Task', user: 1, completed: false },
//       { title: 'Hi Gary', user: 1, completed: false, color: 'red' },
//       { title: 'Look at me', user: 3, completed: false },
//       { title: 'I am Mr. Meeseeks', user: 2, completed: false },
//       { title: 'SAY MY NAME!', user: 1, completed: false },
//       { title: ':)', user: 4, completed: false },
//     ],
//   },
//   {
//     date: 1591196136,
//     tasks: [
//       { title: 'Hi I am a Task', user: 1, completed: false },
//       { title: 'Hi Gary', user: 1, completed: false },
//       { title: 'Look at me', user: 3, completed: false, color: 'teal' },
//       { title: 'I am Mr. Meeseeks', user: 2, completed: false },
//       { title: 'SAY MY NAME!', user: 1, completed: false },
//       { title: ':)', user: 4, completed: false },
//     ],
//   },
//   {
//     date: 1591368936,
//     tasks: [
//       { title: 'Hi I am a Task', user: 1, completed: false },
//       { title: 'Hi Gary', user: 1, completed: false },
//       { title: 'Look at me', user: 3, completed: false },
//       { title: 'I am Mr. Meeseeks', user: 2, completed: false },
//       { title: 'SAY MY NAME!', user: 1, completed: false },
//       { title: ':)', user: 4, completed: false },
//     ],
//   },
// ],
