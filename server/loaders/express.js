// import routes from '../api';
import config from '../config';

export default (app) => {
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

  // Load API routes
  // app.use(config.api.prefix, routes());
};
