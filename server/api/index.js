var express = require('express');

// Router function responsible for routing all the worker associated API endpoints
var worker = require('./routes/worker');

// Router function responsible for routing all the manager associated API endpoints
var manager = require('./routes/manager');

module.exports = function () {
  // Router used to route to /api/v1/ endpoints
  var apiRouter = express.Router();

  worker(apiRouter);
  manager(apiRouter);

  return apiRouter;
};
