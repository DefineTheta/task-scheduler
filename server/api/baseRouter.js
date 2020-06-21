var express = require('express');

// Router function responsible for routing all the user associated base endpoints
import user from './routes/user';

export default () => {
  // Router used to route to /api/v1/ endpoints
  var baseRouter = express.Router();

  user(baseRouter);

  return baseRouter;
};
