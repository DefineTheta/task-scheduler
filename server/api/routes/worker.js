var express = require('express');

// Router used to route /api/v1/worker endpoints
var workerRouter = express.Router();

module.exports = function (apiRouter) {
  apiRouter.use('/worker', workerRouter);

  // GET route used to retrive all the workspace a worker belongs to
  workerRouter.get('/workspaces', function (req, res) {
    var workspaces = [
      { id: 1, name: '🎀 WOTBOS New York' },
      { id: 2, name: '📜 Quest Workspaces' },
      { id: 3, name: '🎶 The Farm SoHo NYC' },
    ];

    res.json(workspaces);
  });
};
