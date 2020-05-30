// Import loader function that will set up dev server middleware for development
import devServerLoader from './devServer';

// Import containing functions to load and set up the express app
import expressLoader from './express';

import Logger from './logger';

export default async (expressApp) => {
  // Load and start dev server with middleware
  // Only if the node enviornment is development
  const [serverStarted, compiler] = await devServerLoader(expressApp);
  serverStarted === true
    ? Logger.info('✔️ Dev Server loaded and started!')
    : Logger.warn('❔ Dev server not started, node is running in production mode!');

  // Load and set up the express server
  await expressLoader(expressApp);
  Logger.info('✔️ Express loaded');
};
