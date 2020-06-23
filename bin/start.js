// Used to bundle code
const webpack = require('webpack');

// Used to move files
var mv = require('mv');

// Get different configration files to tell webpack how to bundle files
const serverWebpackConfig = require('../webpack.server.config');
const clientWebpackConfig =
  process.env.NODE_ENV === 'production'
    ? require('../webpack.prod.config.js')
    : require('../webpack.dev.config.js');

// Library used to delete folders and files
const del = require('del');

// Allows for execution of other scripts from this one
const childProcess = require('child_process');

// Create and call function to delete previous dist folder
del.sync(['dist/**', '!dist', '!dist/VueEvent.js']);

const startServer = (serverPath, callback) => {
  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false;

  var process = childProcess.fork(serverPath);

  // listen for errors as they may prevent the exit event from firing
  process.on('error', function (err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  process.on('exit', function (code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error('exit code ' + code);
    callback(err);
  });
};

webpack([serverWebpackConfig, clientWebpackConfig], (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  const filenames = ['index.js', 'schedule.js', 'new_task.js'];

  // Move generated javascript files
  filenames.map(function (filename) {
    mv('./dist/' + filename, './dist/public/' + filename, { mkdirp: true }, function (
      err,
    ) {
      if (err !== undefined) console.log(err);
    });
  });

  if (!stats.hasErrors() && !stats.hasWarnings()) {
    startServer('dist/server.js', (err) => console.log(err));
  }
});
