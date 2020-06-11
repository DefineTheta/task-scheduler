// Webpack uses this to work with directories
const path = require('path');

// Allows us to use plugins associated with webpack
const webpack = require('webpack');

// Plugin that will generate an HTML5 file with all bundles included
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Plugin to load .vue files with webpack
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin his work
  entry: {
    index: [
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      './client/src/vue/index_entry.js',
    ],
    schedule: [
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      './client/src/vue/schedule_entry.js',
    ],
    new_task: [
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      './client/src/vue/new_task_entry.js',
    ],
  },
  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript
  // minifying and other thing so let's set mode to development
  mode: 'development',

  target: 'web',

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
              failOnError: false,
              failOnWarning: false,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
              failOnError: false,
              failOnWarning: false,
            },
          },
        ],
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            // Applies the processed CSS into the webpage
            loader: 'style-loader',
          },
          {
            // This loader resolves url() and @imports inside CSS
            loader: 'css-loader',
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: 'postcss-loader',
          },
          {
            // First we transform SASS to standard CSS
            loader: 'sass-loader',
          },
        ],
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin({
      filename: './schedule.html',
      template: './client/src/schedule.html',
      chunks: ['schedule'],
    }),
    new HtmlWebPackPlugin({
      filename: './index.html',
      template: './client/src/index.html',
      chunks: ['index'],
    }),
    new HtmlWebPackPlugin({
      filename: './new_task.html',
      template: './client/src/new_task.html',
      chunks: ['new_task'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  // These are settings for how modules are resolved
  // For example what file to look for when only a directory is provided to webpack
  resolve: {
    alias: {},
    extensions: ['.js', '.vue'],
    mainFiles: ['index'],
  },
};
