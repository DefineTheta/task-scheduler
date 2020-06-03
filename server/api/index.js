var express = require('express');

// Router function responsible for routing all the worker associated API endpoints
var worker = require('./routes/worker');

module.exports = function () {
  // Router used to route to /api/v1/ endpoints
  var apiRouter = express.Router();

  worker(apiRouter);

  return apiRouter;
};
