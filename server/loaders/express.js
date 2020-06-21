import config from '../config';

// Router routing to all the data API endpoints
import apiRouter from '../api/apiRouter';

// Router routing to all the base functionality endpoints (login, join, logout)
import baseRouter from '../api/baseRouter';

// Import so express session can be used
import Session from 'express-session';

export default (app) => {
  // Setup sessions for express
  app.use(
    Session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Load API data routes
  app.use(config.api.prefix, apiRouter());

  // Load base functionality routes
  app.use('/', baseRouter());
};
