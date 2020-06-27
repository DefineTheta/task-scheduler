// Import containing functions to load and set up the express app
import expressLoader from './express';

// Import Winston logger instance to log messages to console
import Logger from './logger';

export default async (expressApp) => {
  // Load and set up the express server
  await expressLoader(expressApp);
  Logger.info('✔️ Express loaded');
};
