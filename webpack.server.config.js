// Webpack uses this to work with directories
const path = require('path');

// Webpack uses this to exclude node_modules folder from bundle
const nodeExternals = require('webpack-node-externals');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin his work
  entry: './server/server.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },

  // Deployment target for this webpack bundle
  target: 'node',

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript
  // minifying and other thing so let's set mode to development
  mode: process.env.NODE_ENV === 'prod' ? 'production' : 'development',

  node: {
    __dirname: false,
    __filename: false,
  },

  // Excludes node_modules folder from bundle using the webpack-node-externals plugin
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },

  resolve: {
    alias: {
      Models: path.resolve(__dirname, 'server/models'),
      Services: path.resolve(__dirname, 'server/services'),
      Jobs: path.resolve(__dirname, 'server/jobs'),
      Data: path.resolve(__dirname, 'server/data'),
    },
  },
};
