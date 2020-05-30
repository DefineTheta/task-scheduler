import path from 'path';

// Used for webpack auto rebundling and hot module reloading
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import clientWebpackConfig from '../../webpack.dev.config.js';

export default (app) => {
  if (process.env.NODE_ENV === 'development') {
    //Update alias redirection for updated dist directory
    clientWebpackConfig.resolve.alias = {};

    // Create a compiler to compile the webpack bundle
    const compiler = webpack(clientWebpackConfig);

    // Set up dev server middleware and hot module reloading middleware
    app.use(
      webpackDevMiddleware(compiler, {
        stats: 'minimal',
        publicPath: '/',
      }),
    );

    app.use(
      webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
      }),
    );

    return [true, compiler];
  }

  return false;
};
