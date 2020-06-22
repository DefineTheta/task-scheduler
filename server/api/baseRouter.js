var express = require('express');

// Router function responsible for routing all the user associated base endpoints
import user from './routes/user';

// Router function responsible for routing all the workspace associated endpoints
import workspace from './routes/workspace';

// Router function responsible for routing all the task associated endpoints
import task from './routes/task';

export default () => {
  // Router used to route to /api/v1/ endpoints
  var baseRouter = express.Router();

  user(baseRouter);
  workspace(baseRouter);
  task(baseRouter);

  return baseRouter;
};
