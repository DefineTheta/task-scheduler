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

/***/ "./server/api/apiRouter.js":
/*!*********************************!*\
  !*** ./server/api/apiRouter.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _routes_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes/worker */ \"./server/api/routes/worker.js\");\nvar express = __webpack_require__(/*! express */ \"express\"); // Router function responsible for routing all the worker associated API endpoints\n\n\n // Router function responsible for routing all the manager associated API endpoints\n\nvar manager = __webpack_require__(/*! ./routes/manager */ \"./server/api/routes/manager.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  // Router used to route to /api/v1/ endpoints\n  var apiRouter = express.Router();\n  Object(_routes_worker__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(apiRouter);\n  manager(apiRouter);\n  return apiRouter;\n});\n\n//# sourceURL=webpack:///./server/api/apiRouter.js?");

/***/ }),

/***/ "./server/api/baseRouter.js":
/*!**********************************!*\
  !*** ./server/api/baseRouter.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _routes_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes/user */ \"./server/api/routes/user.js\");\nvar express = __webpack_require__(/*! express */ \"express\"); // Router function responsible for routing all the user associated base endpoints\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  // Router used to route to /api/v1/ endpoints\n  var baseRouter = express.Router();\n  Object(_routes_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(baseRouter);\n  return baseRouter;\n});\n\n//# sourceURL=webpack:///./server/api/baseRouter.js?");

/***/ }),

/***/ "./server/api/routes/manager.js":
/*!**************************************!*\
  !*** ./server/api/routes/manager.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\"); // Router used to route /api/v1/manager endpoints\n\n\nvar managerRouter = express.Router();\n\nmodule.exports = function (apiRouter) {\n  apiRouter.use('/manager', managerRouter); // Create a new manager account\n\n  managerRouter.post('/join', function (req, res) {\n    res.json({\n      account_type: 'manager'\n    });\n  }); // Login a manager account\n\n  managerRouter.post('/login', function (req, res) {\n    res.json({\n      account_type: 'manager'\n    });\n  }); // GET route used to retrive all the workspace a maanger belongs to\n\n  managerRouter.get('/workspaces', function (req, res) {\n    var workspaces = [{\n      id: 1,\n      name: '🎀 WOTBOS New York'\n    }, {\n      id: 2,\n      name: '📜 Quest Workspaces'\n    }, {\n      id: 3,\n      name: '🎶 The Farm SoHo NYC'\n    }];\n    res.json(workspaces);\n  }); // GET route used to retrive all the workers in a workspace a maanger belongs to\n\n  managerRouter.get('/workspaces/workers', function (req, res) {\n    var workers = [{\n      id: 1,\n      name: 'Amy Fischer'\n    }, {\n      id: 2,\n      name: 'Bob The Builder'\n    }, {\n      id: 3,\n      name: 'Tigger'\n    }];\n    res.json(workers);\n  }); // GET route used to retrive today's tasks\n\n  managerRouter.get('/tasks', function (req, res) {\n    if (req.query.timeline == 'today' || req.query.timeline == undefined) {\n      var tasks = [{\n        date: Math.round(new Date().getTime() / 1000),\n        tasks: [{\n          title: 'This is a manager test task',\n          user: 1,\n          completed: false\n        }, {\n          title: 'You have logged in as the manager',\n          user: 1,\n          completed: false,\n          color: 'red'\n        }, {\n          title: 'Muhahaahaha',\n          user: 3,\n          completed: false,\n          color: 'orange'\n        }, {\n          title: 'This one too',\n          user: 2,\n          completed: false,\n          color: 'purple'\n        }, {\n          title: 'Back to me again I should really clean the dishes',\n          user: 1,\n          completed: false,\n          color: 'green'\n        }, {\n          title: ':)',\n          user: 4,\n          completed: false\n        }]\n      }];\n      res.json(tasks);\n    } else if (req.query.timeline == 'week') {\n      var today = new Date();\n      var _tasks = [{\n        date: Math.round(today.getTime() / 1000),\n        tasks: [{\n          title: 'This is a test task',\n          user: 1,\n          completed: false\n        }, {\n          title: 'I have to do this taks today',\n          user: 1,\n          completed: false,\n          color: 'red'\n        }, {\n          title: 'This task is not assigned to me',\n          user: 3,\n          completed: false,\n          color: 'orange'\n        }, {\n          title: 'This one too',\n          user: 2,\n          completed: false,\n          color: 'purple'\n        }, {\n          title: 'Back to me again I should really clean the dishes',\n          user: 1,\n          completed: false,\n          color: 'green'\n        }, {\n          title: ':)',\n          user: 4,\n          completed: false\n        }]\n      }, {\n        date: Math.round(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).getTime() / 1000),\n        tasks: [{\n          title: 'This is a task in 2 days',\n          user: 1,\n          completed: false,\n          color: 'red'\n        }, {\n          title: 'Looks like it is working',\n          user: 1,\n          completed: false\n        }, {\n          title: 'This is just dummy data',\n          user: 3,\n          completed: false,\n          color: 'orange'\n        }, {\n          title: 'This one too',\n          user: 2,\n          completed: false,\n          color: 'purple'\n        }, {\n          title: 'So do not worry about it',\n          user: 1,\n          completed: false\n        }, {\n          title: ':)',\n          user: 4,\n          completed: false\n        }]\n      }, {\n        date: Math.round(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3).getTime() / 1000),\n        tasks: [{\n          title: 'This is a task in 2 days',\n          user: 1,\n          completed: false,\n          color: 'red'\n        }, {\n          title: 'Looks like it is working',\n          user: 1,\n          completed: false\n        }, {\n          title: 'This is just dummy data',\n          user: 3,\n          completed: false,\n          color: 'orange'\n        }, {\n          title: 'This one too',\n          user: 2,\n          completed: false,\n          color: 'purple'\n        }, {\n          title: 'So do not worry about it',\n          user: 1,\n          completed: false\n        }, {\n          title: ':)',\n          user: 4,\n          completed: false\n        }]\n      }, {\n        date: Math.round(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).getTime() / 1000),\n        tasks: [{\n          title: 'This is a task in 2 days',\n          user: 1,\n          completed: false,\n          color: 'red'\n        }, {\n          title: 'Looks like it is working',\n          user: 1,\n          completed: false\n        }, {\n          title: 'This is just dummy data',\n          user: 3,\n          completed: false,\n          color: 'orange'\n        }, {\n          title: 'This one too',\n          user: 2,\n          completed: false,\n          color: 'purple'\n        }, {\n          title: 'So do not worry about it',\n          user: 1,\n          completed: false\n        }, {\n          title: ':)',\n          user: 4,\n          completed: false\n        }]\n      }];\n      res.json(_tasks);\n    }\n  });\n};\n\n//# sourceURL=webpack:///./server/api/routes/manager.js?");

/***/ }),

/***/ "./server/api/routes/user.js":
/*!***********************************!*\
  !*** ./server/api/routes/user.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-validator */ \"express-validator\");\n/* harmony import */ var express_validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_validator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var Loaders_mysql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Loaders/mysql */ \"./server/loaders/mysql.js\");\n/* harmony import */ var Loaders_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Loaders/logger */ \"./server/loaders/logger.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n // Used to validate any params recieved from client\n\n // A poll of connections to MySQL database used to make queries\n\n // Import Winston logger instance to log messages to console\n\n\nvar userRouter = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router(); // Function used to format validation errors (if any)\n\nvar validationErrorFormatter = function validationErrorFormatter(_ref) {\n  var msg = _ref.msg;\n  return msg;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (baseRouter) {\n  baseRouter.use('/', userRouter); // POST route used when a new user wants to create an account\n\n  userRouter.post('/join', [// Check that first name is not empty\n  Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"check\"])('first_name').not().isEmpty().withMessage('First name can not be empty'), // Check that the first name only contains alphabets\n  Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"check\"])('first_name').isAlpha().withMessage('First name can only contain letters (a-zA-Z)'), // Check that last name is not empty\n  Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"check\"])('last_name').not().isEmpty().withMessage('Last name can not be empty'), // Check that last name only contains alphabets\n  Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"check\"])('last_name').isAlpha().withMessage('Last name can only contain letters (a-zA-Z)'), // Check that username is of valid length\n  Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"check\"])('username').isLength({\n    min: 5,\n    max: 30\n  }).withMessage('Username size needs to be between 5 and 30'), // Check that password is a valid hash\n  Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"check\"])('pass').isMD5().withMessage('The password is not hashed properly'), // Check that email is valid\n  Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"check\"])('email').isEmail().withMessage('Provided email is not a valid email'), // Check that account type is a valid enum\n  Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"check\"])('account_type').isInt({\n    min: 0,\n    max: 1\n  }).withMessage('Account type is not a valid type')], /*#__PURE__*/function () {\n    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {\n      var session, validationErrors, userID, _yield$MySQLPool$quer, _yield$MySQLPool$quer2, rows, _yield$MySQLPool$quer3, _yield$MySQLPool$quer4, _rows;\n\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              session = req.session;\n\n              if (!(session.isUserLoggedIn === true)) {\n                _context.next = 5;\n                break;\n              }\n\n              res.redirect('/scheduler');\n              _context.next = 34;\n              break;\n\n            case 5:\n              validationErrors = Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"validationResult\"])(req).formatWith(validationErrorFormatter);\n\n              if (!(validationErrors.isEmpty() === false)) {\n                _context.next = 10;\n                break;\n              }\n\n              res.status(422).json({\n                errors: validationErrors.array()\n              });\n              _context.next = 34;\n              break;\n\n            case 10:\n              userID = undefined;\n              _context.prev = 11;\n\n              if (!(req.body.account_type === 0)) {\n                _context.next = 21;\n                break;\n              }\n\n              _context.next = 15;\n              return Loaders_mysql__WEBPACK_IMPORTED_MODULE_2__[\"default\"].query('CALL NewManager(?,?,?,?,?)', [req.body.first_name, req.body.last_name, req.body.email, req.body.username, req.body.pass]);\n\n            case 15:\n              _yield$MySQLPool$quer = _context.sent;\n              _yield$MySQLPool$quer2 = _slicedToArray(_yield$MySQLPool$quer, 1);\n              rows = _yield$MySQLPool$quer2[0];\n              userID = rows[0][0].manager_id;\n              _context.next = 28;\n              break;\n\n            case 21:\n              if (!(req.body.account_type === 1)) {\n                _context.next = 28;\n                break;\n              }\n\n              _context.next = 24;\n              return Loaders_mysql__WEBPACK_IMPORTED_MODULE_2__[\"default\"].query('CALL NewWorker(?,?,?,?,?)', [req.body.first_name, req.body.last_name, req.body.email, req.body.username, req.body.pass]);\n\n            case 24:\n              _yield$MySQLPool$quer3 = _context.sent;\n              _yield$MySQLPool$quer4 = _slicedToArray(_yield$MySQLPool$quer3, 1);\n              _rows = _yield$MySQLPool$quer4[0];\n              userID = _rows[0][0].worker_id;\n\n            case 28:\n              // Something has gone wrong and there is no user id\n              if (userID == undefined) {\n                Loaders_logger__WEBPACK_IMPORTED_MODULE_3__[\"default\"].error('No user id returned when creating a new user');\n                res.status(500).json({\n                  error: 'Internal server error occured'\n                });\n              } else {\n                // Store user information in session\n                session.isUserLoggedIn = true;\n                session.userID = userID;\n                session.userType = req.body.account_type;\n                res.redirect('/scheduler');\n              }\n\n              _context.next = 34;\n              break;\n\n            case 31:\n              _context.prev = 31;\n              _context.t0 = _context[\"catch\"](11);\n\n              // Check what type of error occured\n              if (_context.t0.code === 'ER_DUP_ENTRY') {\n                // Only a dublicate username can cause this MySQL error\n                Loaders_logger__WEBPACK_IMPORTED_MODULE_3__[\"default\"].warn(_context.t0);\n                res.status(422).json({\n                  errors: ['Username already exists']\n                });\n              } else {\n                // Any other error is bad news\n                Loaders_logger__WEBPACK_IMPORTED_MODULE_3__[\"default\"].error(_context.t0);\n                res.status(500).json({\n                  error: 'Internal server error occured'\n                });\n              }\n\n            case 34:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[11, 31]]);\n    }));\n\n    return function (_x, _x2) {\n      return _ref2.apply(this, arguments);\n    };\n  }()); // POST route used when a user wants to login\n\n  userRouter.post('/login', [// Check that username is of valid length\n  Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"check\"])('username').isLength({\n    min: 5,\n    max: 30\n  }), // Check that password is a valid hash\n  Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"check\"])('pass').isMD5(), // Check that account type is a valid enum\n  Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"check\"])('account_type').isInt({\n    min: 0,\n    max: 1\n  })], /*#__PURE__*/function () {\n    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {\n      var session, validationErrors, userID, _yield$MySQLPool$quer5, _yield$MySQLPool$quer6, rows, _yield$MySQLPool$quer7, _yield$MySQLPool$quer8, _rows2;\n\n      return regeneratorRuntime.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              session = req.session;\n\n              if (!(session.isUserLoggedIn === true)) {\n                _context2.next = 5;\n                break;\n              }\n\n              res.redirect('/scheduler');\n              _context2.next = 35;\n              break;\n\n            case 5:\n              validationErrors = Object(express_validator__WEBPACK_IMPORTED_MODULE_1__[\"validationResult\"])(req).formatWith(validationErrorFormatter);\n\n              if (!(validationErrors.isEmpty() === false)) {\n                _context2.next = 10;\n                break;\n              }\n\n              res.status(401).json({\n                error: 'Invalid account information'\n              });\n              _context2.next = 35;\n              break;\n\n            case 10:\n              userID = undefined;\n              _context2.prev = 11;\n\n              if (!(req.body.account_type === 0)) {\n                _context2.next = 21;\n                break;\n              }\n\n              _context2.next = 15;\n              return Loaders_mysql__WEBPACK_IMPORTED_MODULE_2__[\"default\"].query('CALL CheckManagerExists(?,?)', [req.body.username, req.body.pass]);\n\n            case 15:\n              _yield$MySQLPool$quer5 = _context2.sent;\n              _yield$MySQLPool$quer6 = _slicedToArray(_yield$MySQLPool$quer5, 1);\n              rows = _yield$MySQLPool$quer6[0];\n              if (rows[0].length === 1) userID = rows[0][0].manager_id;\n              _context2.next = 28;\n              break;\n\n            case 21:\n              if (!(req.body.account_type === 1)) {\n                _context2.next = 28;\n                break;\n              }\n\n              _context2.next = 24;\n              return Loaders_mysql__WEBPACK_IMPORTED_MODULE_2__[\"default\"].query('CALL CheckWorkerExists(?,?)', [req.body.username, req.body.pass]);\n\n            case 24:\n              _yield$MySQLPool$quer7 = _context2.sent;\n              _yield$MySQLPool$quer8 = _slicedToArray(_yield$MySQLPool$quer7, 1);\n              _rows2 = _yield$MySQLPool$quer8[0];\n              if (_rows2[0].length === 1) userID = _rows2[0][0].worker_id;\n\n            case 28:\n              // No account with matching details found\n              if (userID == undefined) {\n                res.status(401).json({\n                  error: 'Account does not exist'\n                });\n              } else {\n                // Store user information in session\n                session.isUserLoggedIn = true;\n                session.userID = userID;\n                session.userType = req.body.account_type;\n                res.redirect('/scheduler');\n              }\n\n              _context2.next = 35;\n              break;\n\n            case 31:\n              _context2.prev = 31;\n              _context2.t0 = _context2[\"catch\"](11);\n              Loaders_logger__WEBPACK_IMPORTED_MODULE_3__[\"default\"].error(_context2.t0);\n              res.status(500).json({\n                error: 'Internal server error occured'\n              });\n\n            case 35:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2, null, [[11, 31]]);\n    }));\n\n    return function (_x3, _x4) {\n      return _ref3.apply(this, arguments);\n    };\n  }()); // POST route used when a user wants to logout\n\n  userRouter.post('/logout', /*#__PURE__*/function () {\n    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {\n      var session;\n      return regeneratorRuntime.wrap(function _callee3$(_context3) {\n        while (1) {\n          switch (_context3.prev = _context3.next) {\n            case 0:\n              session = req.session;\n              session.destroy(function (error) {\n                // Check if any error occured\n                if (error !== undefined) {\n                  Loaders_logger__WEBPACK_IMPORTED_MODULE_3__[\"default\"].error(error);\n                  res.status(500).json({\n                    success: false,\n                    error: 'Internal server error occured'\n                  });\n                } else {\n                  res.json({\n                    success: true\n                  });\n                }\n              });\n\n            case 2:\n            case \"end\":\n              return _context3.stop();\n          }\n        }\n      }, _callee3);\n    }));\n\n    return function (_x5, _x6) {\n      return _ref4.apply(this, arguments);\n    };\n  }());\n});\n\n//# sourceURL=webpack:///./server/api/routes/user.js?");

/***/ }),

/***/ "./server/api/routes/worker.js":
/*!*************************************!*\
  !*** ./server/api/routes/worker.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var Loaders_mysql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Loaders/mysql */ \"./server/loaders/mysql.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\n // Router used to route /api/v1/worker endpoints\n\nvar workerRouter = express.Router();\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (apiRouter) {\n  apiRouter.use('/worker', workerRouter); // Create a new worker account\n\n  workerRouter.post('/join', function (req, res) {\n    res.json({\n      account_type: 'worker'\n    });\n  }); // Login a worker account\n\n  workerRouter.post('/login', function (req, res) {\n    res.json({\n      account_type: 'worker'\n    });\n  }); // GET route used to retrive all the workspace a worker belongs to\n\n  workerRouter.get('/workspaces', /*#__PURE__*/function () {\n    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {\n      var session;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              // var workspaces = [\n              //   { id: 1, name: '🎀 WOTBOS New York' },\n              //   { id: 2, name: '📜 Quest Workspaces' },\n              //   { id: 3, name: '🎶 The Farm SoHo NYC' },\n              // ];\n              // res.json(workspaces);\n              session = req.session;\n\n              if (session.test === undefined) {\n                session.test = 'Testing!';\n              } else {\n                console.log(session.test);\n              } // const [errors, rows, fields] = await MySqlPool.query('CALL NewManager(?,?,?,?,?)', [\n              //   'Parthey',\n              //   'Baby',\n              //   'test@gmail.com',\n              //   'parthey_b',\n              //   'pass',\n              // ]);\n              // console.log('ERRORS!!!!');\n              // console.log(errors);\n              // console.log('ROWS!!!');\n              // console.log(rows);\n              // console.log('FIELDS!!!!');\n              // console.log(fields);\n\n\n              res.json({});\n\n            case 3:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function (_x, _x2) {\n      return _ref.apply(this, arguments);\n    };\n  }()); // GET route used to retrive today's tasks\n\n  workerRouter.get('/tasks', function (req, res) {\n    if (req.query.timeline == 'today' || req.query.timeline == undefined) {\n      var tasks = [{\n        date: Math.round(new Date().getTime() / 1000),\n        tasks: [{\n          title: 'This is a test task',\n          user: 1,\n          completed: false\n        }, {\n          title: 'I have to do this taks today',\n          user: 1,\n          completed: false,\n          color: 'red'\n        }, {\n          title: 'This task is not assigned to me',\n          user: 3,\n          completed: false,\n          color: 'orange'\n        }, {\n          title: 'This one too',\n          user: 2,\n          completed: false,\n          color: 'purple'\n        }, {\n          title: 'Back to me again I should really clean the dishes',\n          user: 1,\n          completed: false,\n          color: 'green'\n        }, {\n          title: ':)',\n          user: 4,\n          completed: false\n        }]\n      }];\n      res.json(tasks);\n    } else if (req.query.timeline == 'week') {\n      var today = new Date();\n      var _tasks = [{\n        date: Math.round(today.getTime() / 1000),\n        tasks: [{\n          title: 'This is a test task',\n          user: 1,\n          completed: false\n        }, {\n          title: 'I have to do this taks today',\n          user: 1,\n          completed: false,\n          color: 'red'\n        }, {\n          title: 'This task is not assigned to me',\n          user: 3,\n          completed: false,\n          color: 'orange'\n        }, {\n          title: 'This one too',\n          user: 2,\n          completed: false,\n          color: 'purple'\n        }, {\n          title: 'Back to me again I should really clean the dishes',\n          user: 1,\n          completed: false,\n          color: 'green'\n        }, {\n          title: ':)',\n          user: 4,\n          completed: false\n        }]\n      }, {\n        date: Math.round(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).getTime() / 1000),\n        tasks: [{\n          title: 'This is a task in 2 days',\n          user: 1,\n          completed: false,\n          color: 'red'\n        }, {\n          title: 'Looks like it is working',\n          user: 1,\n          completed: false\n        }, {\n          title: 'This is just dummy data',\n          user: 3,\n          completed: false,\n          color: 'orange'\n        }, {\n          title: 'This one too',\n          user: 2,\n          completed: false,\n          color: 'purple'\n        }, {\n          title: 'So do not worry about it',\n          user: 1,\n          completed: false\n        }, {\n          title: ':)',\n          user: 4,\n          completed: false\n        }]\n      }, {\n        date: Math.round(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3).getTime() / 1000),\n        tasks: [{\n          title: 'This is a task in 2 days',\n          user: 1,\n          completed: false,\n          color: 'red'\n        }, {\n          title: 'Looks like it is working',\n          user: 1,\n          completed: false\n        }, {\n          title: 'This is just dummy data',\n          user: 3,\n          completed: false,\n          color: 'orange'\n        }, {\n          title: 'This one too',\n          user: 2,\n          completed: false,\n          color: 'purple'\n        }, {\n          title: 'So do not worry about it',\n          user: 1,\n          completed: false\n        }, {\n          title: ':)',\n          user: 4,\n          completed: false\n        }]\n      }, {\n        date: Math.round(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).getTime() / 1000),\n        tasks: [{\n          title: 'This is a task in 2 days',\n          user: 1,\n          completed: false,\n          color: 'red'\n        }, {\n          title: 'Looks like it is working',\n          user: 1,\n          completed: false\n        }, {\n          title: 'This is just dummy data',\n          user: 3,\n          completed: false,\n          color: 'orange'\n        }, {\n          title: 'This one too',\n          user: 2,\n          completed: false,\n          color: 'purple'\n        }, {\n          title: 'So do not worry about it',\n          user: 1,\n          completed: false\n        }, {\n          title: ':)',\n          user: 4,\n          completed: false\n        }]\n      }];\n      res.json(_tasks);\n    }\n  });\n}); // [\n//   {\n//     date: 1591109736,\n//     tasks: [\n//       { title: 'Hi I am a Task', user: 1, completed: false },\n//       { title: 'Hi Gary', user: 1, completed: false, color: 'red' },\n//       { title: 'Look at me', user: 3, completed: false },\n//       { title: 'I am Mr. Meeseeks', user: 2, completed: false },\n//       { title: 'SAY MY NAME!', user: 1, completed: false },\n//       { title: ':)', user: 4, completed: false },\n//     ],\n//   },\n//   {\n//     date: 1591196136,\n//     tasks: [\n//       { title: 'Hi I am a Task', user: 1, completed: false },\n//       { title: 'Hi Gary', user: 1, completed: false },\n//       { title: 'Look at me', user: 3, completed: false, color: 'teal' },\n//       { title: 'I am Mr. Meeseeks', user: 2, completed: false },\n//       { title: 'SAY MY NAME!', user: 1, completed: false },\n//       { title: ':)', user: 4, completed: false },\n//     ],\n//   },\n//   {\n//     date: 1591368936,\n//     tasks: [\n//       { title: 'Hi I am a Task', user: 1, completed: false },\n//       { title: 'Hi Gary', user: 1, completed: false },\n//       { title: 'Look at me', user: 3, completed: false },\n//       { title: 'I am Mr. Meeseeks', user: 2, completed: false },\n//       { title: 'SAY MY NAME!', user: 1, completed: false },\n//       { title: ':)', user: 4, completed: false },\n//     ],\n//   },\n// ],\n\n//# sourceURL=webpack:///./server/api/routes/worker.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ \"./server/config/index.js\");\n/* harmony import */ var _api_apiRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/apiRouter */ \"./server/api/apiRouter.js\");\n/* harmony import */ var _api_baseRouter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/baseRouter */ \"./server/api/baseRouter.js\");\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express-session */ \"express-session\");\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_3__);\n // Router routing to all the data API endpoints\n\n // Router routing to all the base functionality endpoints (login, join, logout)\n\n // Import so express session can be used\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (app) {\n  // Setup sessions for express\n  app.use(express_session__WEBPACK_IMPORTED_MODULE_3___default()({\n    secret: process.env.SESSION_SECRET,\n    resave: false,\n    saveUninitialized: false\n  }));\n  /**\r\n   * Health Check endpoints\r\n   * @TODO Explain why they are here\r\n   */\n\n  app.get('/status', function (req, res) {\n    res.status(200).end();\n  });\n  app.head('/status', function (req, res) {\n    res.status(200).end();\n  }); // Load API data routes\n\n  app.use(_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].api.prefix, Object(_api_apiRouter__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()); // Load base functionality routes\n\n  app.use('/', Object(_api_baseRouter__WEBPACK_IMPORTED_MODULE_2__[\"default\"])());\n});\n\n//# sourceURL=webpack:///./server/loaders/express.js?");

/***/ }),

/***/ "./server/loaders/index.js":
/*!*********************************!*\
  !*** ./server/loaders/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _devServer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./devServer */ \"./server/loaders/devServer.js\");\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./express */ \"./server/loaders/express.js\");\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ \"./server/loaders/logger.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n// Import loader function that will set up dev server middleware for development\n // Import containing functions to load and set up the express app\n\n // Import Winston logger instance to log messages to console\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (/*#__PURE__*/(function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(expressApp) {\n    var _yield$devServerLoade, _yield$devServerLoade2, serverStarted, compiler;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return Object(_devServer__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(expressApp);\n\n          case 2:\n            _yield$devServerLoade = _context.sent;\n            _yield$devServerLoade2 = _slicedToArray(_yield$devServerLoade, 2);\n            serverStarted = _yield$devServerLoade2[0];\n            compiler = _yield$devServerLoade2[1];\n            serverStarted === true ? _logger__WEBPACK_IMPORTED_MODULE_2__[\"default\"].info('✔️ Dev Server loaded and started!') : _logger__WEBPACK_IMPORTED_MODULE_2__[\"default\"].warn('❔ Dev server not started, node is running in production mode!'); // Load and set up the express server\n\n            _context.next = 9;\n            return Object(_express__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(expressApp);\n\n          case 9:\n            _logger__WEBPACK_IMPORTED_MODULE_2__[\"default\"].info('✔️ Express loaded');\n\n          case 10:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function (_x) {\n    return _ref.apply(this, arguments);\n  };\n})());\n\n//# sourceURL=webpack:///./server/loaders/index.js?");

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

/***/ "./server/loaders/mysql.js":
/*!*********************************!*\
  !*** ./server/loaders/mysql.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mysql2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql2 */ \"mysql2\");\n/* harmony import */ var mysql2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mysql2__WEBPACK_IMPORTED_MODULE_0__);\n // This creates a pool of mysql connection that support the promis API of ES7\n\nvar MysqlPool = mysql2__WEBPACK_IMPORTED_MODULE_0___default.a.createPool({\n  host: 'localhost',\n  database: 'task_scheduler_plus',\n  waitForConnections: true,\n  connectionLimit: 10,\n  queueLimit: 0\n});\nvar PromisePool = MysqlPool.promise();\n/* harmony default export */ __webpack_exports__[\"default\"] = (PromisePool);\n\n//# sourceURL=webpack:///./server/loaders/mysql.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"regenerator-runtime/runtime\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _loaders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loaders */ \"./server/loaders/index.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ \"./server/config/index.js\");\n/* harmony import */ var _loaders_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loaders/logger */ \"./server/loaders/logger.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n// Used to serve API requests\n\n\n\n\n\n\nvar startServer = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var app, PORT;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            // Create a server instance and set up webpack settings\n            app = express__WEBPACK_IMPORTED_MODULE_0___default()(); // Allow to parse body and url in requests\n\n            app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({\n              extended: true\n            }));\n            app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.json()); // Use enviornment variable for port or the default port\n\n            PORT = process.env.PORT || 3000;\n            _context.next = 6;\n            return Object(_loaders__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(app);\n\n          case 6:\n            app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a[\"static\"](_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].dist.path, {\n              extensions: ['html']\n            })); // app.get('*', (req, res) => {\n            //   res.sendFile(config.dist.path + '/index.html');\n            // });\n            // Start server and get it to listen to incomming connections\n\n            app.listen(PORT, function (err) {\n              if (err) {\n                _loaders_logger__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(err);\n                process.exit(1);\n                return;\n              }\n\n              _loaders_logger__WEBPACK_IMPORTED_MODULE_4__[\"default\"].info(\"\\n      ################################################\\n      \\uD83D\\uDEE1\\uFE0F  Server listening on port: \".concat(PORT, \" \\uD83D\\uDEE1\\uFE0F \\n      ################################################\\n    \"));\n            });\n\n          case 8:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function startServer() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nstartServer();\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "./webpack.dev.config.js":
/*!*******************************!*\
  !*** ./webpack.dev.config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Webpack uses this to work with directories\nvar path = __webpack_require__(/*! path */ \"path\"); // Allows us to use plugins associated with webpack\n\n\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\"); // Plugin that will generate an HTML5 file with all bundles included\n\n\nvar HtmlWebPackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\"); // Plugin to load .vue files with webpack\n\n\nvar VueLoaderPlugin = __webpack_require__(/*! vue-loader/lib/plugin */ \"vue-loader/lib/plugin\"); // This is main configuration object.\n// Here you write different options and tell Webpack what to do\n\n\nmodule.exports = {\n  // Path to your entry point. From this file Webpack will begin his work\n  entry: {\n    index: ['webpack-hot-middleware/client?path=/__webpack_hmr', './client/src/vue/index_entry.js'],\n    schedule: ['webpack-hot-middleware/client?path=/__webpack_hmr', './client/src/vue/schedule_entry.js'],\n    new_task: ['webpack-hot-middleware/client?path=/__webpack_hmr', './client/src/vue/new_task_entry.js']\n  },\n  // Path and filename of your result bundle.\n  // Webpack will bundle all JavaScript into this file\n  output: {\n    path: path.resolve(__dirname, 'dist'),\n    filename: '[name].[hash:8].js'\n  },\n  // Default mode for Webpack is production.\n  // Depending on mode Webpack will apply different things\n  // on final bundle. For now we don't need production's JavaScript\n  // minifying and other thing so let's set mode to development\n  mode: 'development',\n  target: 'web',\n  module: {\n    rules: [{\n      test: /\\.vue$/,\n      use: [{\n        loader: 'vue-loader'\n      }, {\n        loader: 'eslint-loader',\n        options: {\n          emitWarning: true,\n          failOnError: false,\n          failOnWarning: false\n        }\n      }]\n    }, {\n      test: /\\.(js|jsx)$/,\n      exclude: /node_modules/,\n      use: [{\n        loader: 'babel-loader'\n      }, {\n        loader: 'eslint-loader',\n        options: {\n          emitWarning: true,\n          failOnError: false,\n          failOnWarning: false\n        }\n      }]\n    }, {\n      // Apply rule for .sass, .scss or .css files\n      test: /\\.(sa|sc|c)ss$/,\n      // Set loaders to transform files.\n      // Loaders are applying from right to left(!)\n      // The first loader will be applied after others\n      use: [{\n        // Applies the processed CSS into the webpage\n        loader: 'style-loader'\n      }, {\n        // This loader resolves url() and @imports inside CSS\n        loader: 'css-loader'\n      }, {\n        // Then we apply postCSS fixes like autoprefixer and minifying\n        loader: 'postcss-loader'\n      }, {\n        // First we transform SASS to standard CSS\n        loader: 'sass-loader'\n      }]\n    }, {\n      // Loads the javacript into html template provided.\n      // Entry point is set below in HtmlWebPackPlugin in Plugins\n      test: /\\.html$/,\n      use: [{\n        loader: 'html-loader'\n      }]\n    }]\n  },\n  plugins: [new VueLoaderPlugin(), new HtmlWebPackPlugin({\n    filename: './schedule.html',\n    template: './client/src/schedule.html',\n    chunks: ['schedule']\n  }), new HtmlWebPackPlugin({\n    filename: './index.html',\n    template: './client/src/index.html',\n    chunks: ['index']\n  }), new HtmlWebPackPlugin({\n    filename: './new_task.html',\n    template: './client/src/new_task.html',\n    chunks: ['new_task']\n  }), new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],\n  // These are settings for how modules are resolved\n  // For example what file to look for when only a directory is provided to webpack\n  resolve: {\n    alias: {},\n    extensions: ['.js', '.vue'],\n    mainFiles: ['index']\n  }\n};\n\n//# sourceURL=webpack:///./webpack.dev.config.js?");

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

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validator\");\n\n//# sourceURL=webpack:///external_%22express-validator%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "mysql2":
/*!*************************!*\
  !*** external "mysql2" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mysql2\");\n\n//# sourceURL=webpack:///external_%22mysql2%22?");

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