// Used to serve API requests
import express from 'express';

import 'regenerator-runtime/runtime';

import load from './loaders';

import config from './config';
import Logger from './loaders/logger';

const startServer = async () => {
  // Create a server instance and set up webpack settings
  const app = express();

  // Allow to parse body and url in requests
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Use enviornment variable for port or the default port
  const PORT = process.env.PORT || 3000;

  await load(app);

  app.use(express.static(config.dist.path, { extensions: ['html'] }));

  // app.get('*', (req, res) => {
  //   res.sendFile(config.dist.path + '/index.html');
  // });

  // Start server and get it to listen to incomming connections
  app.listen(PORT, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${PORT} 🛡️ 
      ################################################
    `);
  });
};

startServer();
