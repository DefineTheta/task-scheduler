import config from '../config';

// Router routing to all the data API endpoints
import apiRouter from '../api/apiRouter';

// Router routing to all the base functionality endpoints (login, join, logout)
import baseRouter from '../api/baseRouter';

// Import so express session can be used
import Session from 'express-session';

// Import mysql session store
import expressMySqlSession from 'express-mysql-session';

// A poll of connections to MySQL database used to make queries
import MySQLPool from 'Loaders/mysql';

export default (app) => {
  // Setup the MySQL session store
  const sessionStore = new expressMySqlSession({}, MySQLPool);

  // Setup sessions for express
  app.use(
    Session({
      secret: process.env.SESSION_SECRET,
      store: sessionStore,
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

  app.get('/', (req, res) => {
    let session = req.session;

    if (session.isUserLoggedIn === true) {
      res.redirect('/scheduler');
    } else {
      res.sendFile('index.html', { root: config.dist.path });
    }
  });

  app.get('/scheduler', (req, res) => {
    let session = req.session;

    if (session.isUserLoggedIn === true) {
      if (session.userType === 0) {
        res.sendFile('manager_scheduler.html', { root: config.dist.path });
      } else if (session.userType === 1) {
        res.sendFile('worker_scheduler.html', { root: config.dist.path });
      }
    } else {
      res.redirect('/');
    }
  });

  app.get('/create', (req, res) => {
    let session = req.session;

    if (session.isUserLoggedIn === true && session.userType === 0) {
      res.sendFile('new_task.html', { root: config.dist.path });
    } else {
      res.redirect('/');
    }
  });

  // Load API data routes
  app.use(config.api.prefix, apiRouter());

  // Load base functionality routes
  app.use('/', baseRouter());
};
