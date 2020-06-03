/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/api/index.js":
/*!*****************************!*\
  !*** ./server/api/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\"); // Router function responsible for routing all the worker associated API endpoints\n\n\nvar worker = __webpack_require__(/*! ./routes/worker */ \"./server/api/routes/worker.js\");\n\nmodule.exports = function () {\n  // Router used to route to /api/v1/ endpoints\n  var apiRouter = express.Router();\n  worker(apiRouter);\n  return apiRouter;\n};\n\n//# sourceURL=webpack:///./server/api/index.js?");

/***/ }),

/***/ "./server/api/routes/worker.js":
/*!*************************************!*\
  !*** ./server/api/routes/worker.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\"); // Router used to route /api/v1/worker endpoints\n\n\nvar workerRouter = express.Router();\n\nmodule.exports = function (apiRouter) {\n  apiRouter.use('/worker', workerRouter); // GET route used to retrive all the workspace a worker belongs to\n\n  workerRouter.get('/workspaces', function (req, res) {\n    var workspaces = [{\n      id: 1,\n      name: '🎀 WOTBOS New York'\n    }, {\n      id: 2,\n      name: '📜 Quest Workspaces'\n    }, {\n      id: 3,\n      name: '🎶 The Farm SoHo NYC'\n    }];\n    res.json(workspaces);\n  });\n};\n\n//# sourceURL=webpack:///./server/api/routes/worker.js?");

/***/ }),

/***/ "./server/config/index.js":
/*!********************************!*\
  !*** ./server/config/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);\n // Imports enviornment variables for use\n\n\nvar envFound = dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.config();\n\nif (!envFound) {\n  // This error should crash whole process\n  throw new Error(\"⚠️  Couldn't find .env file  ⚠️\");\n}\n\nvar DIST_DIR = path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(__dirname, '../dist/');\nvar HTML_FILE = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(DIST_DIR, 'index.html');\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  logs: {\n    level: process.env.LOG_LEVEL || 'silly'\n  },\n  api: {\n    prefix: '/api/v1/'\n  },\n  dist: {\n    path: DIST_DIR\n  },\n  editor: {\n    path: HTML_FILE\n  }\n});\n\n//# sourceURL=webpack:///./server/config/index.js?");

/***/ }),

/***/ "./server/loaders/devServer.js":
/*!*************************************!*\
  !*** ./server/loaders/devServer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../webpack.dev.config.js */ \"./webpack.dev.config.js\");\n/* harmony import */ var _webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_4__);\n // Used for webpack auto rebundling and hot module reloading\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (app) {\n  if (true) {\n    //Update alias redirection for updated dist directory\n    _webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_4___default.a.resolve.alias = {}; // Create a compiler to compile the webpack bundle\n\n    var compiler = webpack__WEBPACK_IMPORTED_MODULE_1___default()(_webpack_dev_config_js__WEBPACK_IMPORTED_MODULE_4___default.a); // Set up dev server middleware and hot module reloading middleware\n\n    app.use(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_2___default()(compiler, {\n      stats: 'minimal',\n      publicPath: '/'\n    }));\n    app.use(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_3___default()(compiler, {\n      path: '/__webpack_hmr',\n      heartbeat: 10 * 1000\n    }));\n    return [true, compiler];\n  }\n\n  return false;\n});\n\n//# sourceURL=webpack:///./server/loaders/devServer.js?");

/***/ }),

/***/ "./server/loaders/express.js":
/*!***********************************!*\
  !*** ./server/loaders/express.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ \"./server/api/index.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_api__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ \"./server/config/index.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (app) {\n  /**\r\n   * Health Check endpoints\r\n   * @TODO Explain why they are here\r\n   */\n  app.get('/status', function (req, res) {\n    res.status(200).end();\n  });\n  app.head('/status', function (req, res) {\n    res.status(200).end();\n  }); // Load API routes\n\n  app.use(_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].api.prefix, _api__WEBPACK_IMPORTED_MODULE_0___default()());\n});\n\n//# sourceURL=webpack:///./server/loaders/express.js?");

/***/ }),

/***/ "./server/loaders/index.js":
/*!*********************************!*\
  !*** ./server/loaders/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _devServer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./devServer */ \"./server/loaders/devServer.js\");\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./express */ \"./server/loaders/express.js\");\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ \"./server/loaders/logger.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n// Import loader function that will set up dev server middleware for development\n // Import containing functions to load and set up the express app\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (/*#__PURE__*/(function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(expressApp) {\n    var _yield$devServerLoade, _yield$devServerLoade2, serverStarted, compiler;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return Object(_devServer__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(expressApp);\n\n          case 2:\n            _yield$devServerLoade = _context.sent;\n            _yield$devServerLoade2 = _slicedToArray(_yield$devServerLoade, 2);\n            serverStarted = _yield$devServerLoade2[0];\n            compiler = _yield$devServerLoade2[1];\n            serverStarted === true ? _logger__WEBPACK_IMPORTED_MODULE_2__[\"default\"].info('✔️ Dev Server loaded and started!') : _logger__WEBPACK_IMPORTED_MODULE_2__[\"default\"].warn('❔ Dev server not started, node is running in production mode!'); // Load and set up the express server\n\n            _context.next = 9;\n            return Object(_express__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(expressApp);\n\n          case 9:\n            _logger__WEBPACK_IMPORTED_MODULE_2__[\"default\"].info('✔️ Express loaded');\n\n          case 10:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function (_x) {\n    return _ref.apply(this, arguments);\n  };\n})());\n\n//# sourceURL=webpack:///./server/loaders/index.js?");

/***/ }),

/***/ "./server/loaders/logger.js":
/*!**********************************!*\
  !*** ./server/loaders/logger.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! winston */ \"winston\");\n/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(winston__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ \"./server/config/index.js\");\n\n\nvar transports = [];\n\nif (false) {} else {\n  transports.push(new winston__WEBPACK_IMPORTED_MODULE_0___default.a.transports.Console({\n    format: winston__WEBPACK_IMPORTED_MODULE_0___default.a.format.combine(winston__WEBPACK_IMPORTED_MODULE_0___default.a.format.cli(), winston__WEBPACK_IMPORTED_MODULE_0___default.a.format.splat())\n  }));\n}\n\nvar LoggerInstance = winston__WEBPACK_IMPORTED_MODULE_0___default.a.createLogger({\n  level: _config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].logs.level,\n  levels: winston__WEBPACK_IMPORTED_MODULE_0___default.a.config.npm.levels,\n  format: winston__WEBPACK_IMPORTED_MODULE_0___default.a.format.combine(winston__WEBPACK_IMPORTED_MODULE_0___default.a.format.timestamp({\n    format: 'YYYY-MM-DD HH:mm:ss'\n  }), winston__WEBPACK_IMPORTED_MODULE_0___default.a.format.errors({\n    stack: true\n  }), winston__WEBPACK_IMPORTED_MODULE_0___default.a.format.splat(), winston__WEBPACK_IMPORTED_MODULE_0___default.a.format.json()),\n  transports: transports\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (LoggerInstance);\n\n//# sourceURL=webpack:///./server/loaders/logger.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"regenerator-runtime/runtime\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _loaders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loaders */ \"./server/loaders/index.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ \"./server/config/index.js\");\n/* harmony import */ var _loaders_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loaders/logger */ \"./server/loaders/logger.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n// Used to serve API requests\n\n\n\n\n\n\nvar startServer = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var app, PORT;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            // Create a server instance and set up webpack settings\n            app = express__WEBPACK_IMPORTED_MODULE_0___default()(); // Allow to parse body and url in requests\n\n            app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({\n              extended: true\n            }));\n            app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.json()); // Use enviornment variable for port or the default port\n\n            PORT = process.env.PORT || 3000;\n            _context.next = 6;\n            return Object(_loaders__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(app);\n\n          case 6:\n            // app.use(express.static(config.dist.path, { extensions: ['html'] }));\n            app.get('*', function (req, res) {\n              res.sendFile(_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].dist.path + '/index.html');\n            }); // Start server and get it to listen to incomming connections\n\n            app.listen(PORT, function (err) {\n              if (err) {\n                _loaders_logger__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(err);\n                process.exit(1);\n                return;\n              }\n\n              _loaders_logger__WEBPACK_IMPORTED_MODULE_4__[\"default\"].info(\"\\n      ################################################\\n      \\uD83D\\uDEE1\\uFE0F  Server listening on port: \".concat(PORT, \" \\uD83D\\uDEE1\\uFE0F \\n      ################################################\\n    \"));\n            });\n\n          case 8:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function startServer() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nstartServer();\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "./webpack.dev.config.js":
/*!*******************************!*\
  !*** ./webpack.dev.config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Webpack uses this to work with directories\nvar path = __webpack_require__(/*! path */ \"path\"); // Allows us to use plugins associated with webpack\n\n\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\"); // Plugin that will generate an HTML5 file with all bundles included\n\n\nvar HtmlWebPackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\"); // Plugin to load .vue files with webpack\n\n\nvar VueLoaderPlugin = __webpack_require__(/*! vue-loader/lib/plugin */ \"vue-loader/lib/plugin\"); // This is main configuration object.\n// Here you write different options and tell Webpack what to do\n\n\nmodule.exports = {\n  // Path to your entry point. From this file Webpack will begin his work\n  entry: {\n    index: ['webpack-hot-middleware/client?path=/__webpack_hmr', './client/src/vue/main.js']\n  },\n  // Path and filename of your result bundle.\n  // Webpack will bundle all JavaScript into this file\n  output: {\n    path: path.resolve(__dirname, 'dist'),\n    filename: '[name].[hash:8].js'\n  },\n  // Default mode for Webpack is production.\n  // Depending on mode Webpack will apply different things\n  // on final bundle. For now we don't need production's JavaScript\n  // minifying and other thing so let's set mode to development\n  mode: 'development',\n  target: 'web',\n  module: {\n    rules: [{\n      test: /\\.vue$/,\n      use: [{\n        loader: 'vue-loader'\n      }, {\n        loader: 'eslint-loader',\n        options: {\n          emitWarning: true,\n          failOnError: false,\n          failOnWarning: false\n        }\n      }]\n    }, {\n      test: /\\.(js|jsx)$/,\n      exclude: /node_modules/,\n      use: [{\n        loader: 'babel-loader'\n      }, {\n        loader: 'eslint-loader',\n        options: {\n          emitWarning: true,\n          failOnError: false,\n          failOnWarning: false\n        }\n      }]\n    }, {\n      // Apply rule for .sass, .scss or .css files\n      test: /\\.(sa|sc|c)ss$/,\n      // Set loaders to transform files.\n      // Loaders are applying from right to left(!)\n      // The first loader will be applied after others\n      use: [{\n        // Applies the processed CSS into the webpage\n        loader: 'style-loader'\n      }, {\n        // This loader resolves url() and @imports inside CSS\n        loader: 'css-loader'\n      }, {\n        // Then we apply postCSS fixes like autoprefixer and minifying\n        loader: 'postcss-loader'\n      }, {\n        // First we transform SASS to standard CSS\n        loader: 'sass-loader'\n      }]\n    }, {\n      // Loads the javacript into html template provided.\n      // Entry point is set below in HtmlWebPackPlugin in Plugins\n      test: /\\.html$/,\n      use: [{\n        loader: 'html-loader'\n      }]\n    }]\n  },\n  plugins: [new VueLoaderPlugin(), new HtmlWebPackPlugin({\n    filename: './index.html',\n    template: './client/src/index.html',\n    chunks: ['index']\n  }), new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],\n  // These are settings for how modules are resolved\n  // For example what file to look for when only a directory is provided to webpack\n  resolve: {\n    alias: {},\n    extensions: ['.js', '.vue'],\n    mainFiles: ['index']\n  }\n};\n\n//# sourceURL=webpack:///./webpack.dev.config.js?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "regenerator-runtime/runtime":
/*!**********************************************!*\
  !*** external "regenerator-runtime/runtime" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"regenerator-runtime/runtime\");\n\n//# sourceURL=webpack:///external_%22regenerator-runtime/runtime%22?");

/***/ }),

/***/ "vue-loader/lib/plugin":
/*!****************************************!*\
  !*** external "vue-loader/lib/plugin" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"vue-loader/lib/plugin\");\n\n//# sourceURL=webpack:///external_%22vue-loader/lib/plugin%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-hot-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-hot-middleware%22?");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston\");\n\n//# sourceURL=webpack:///external_%22winston%22?");

/***/ })

/******/ });