/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _app = __webpack_require__(1);
	
	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.getStore = getStore;
	exports.getState = getState;
	exports.dispatch = dispatch;
	
	var _app_settings = __webpack_require__(2);
	
	var _app_settings2 = _interopRequireDefault(_app_settings);
	
	var _store = __webpack_require__(3);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _bot = __webpack_require__(22);
	
	var _bot2 = _interopRequireDefault(_bot);
	
	var _services = __webpack_require__(13);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MongoClient = __webpack_require__(17).MongoClient;
	var assert = __webpack_require__(28);
	
	/** Class representing app */
	
	var App = function () {
	
	  /**
	   * Initialize application
	   * @param  {Object} initialState - initial state passed to the app
	   */
	
	  function App(initialState) {
	    var _this = this;
	
	    _classCallCheck(this, App);
	
	    this.store = (0, _store2.default)({});
	    this.configureServices(_app_settings2.default).then(function () {
	      console.log('Services booted, starting Ryszard');
	      _this.bot = new _bot2.default();
	    });
	  }
	
	  /**
	   * Initialize services with provided configuration
	   */
	
	
	  _createClass(App, [{
	    key: 'configureServices',
	    value: function configureServices() {
	      console.log('Booting up services');
	      return (0, _services.bootServices)(_app_settings2.default.services);
	    }
	  }]);
	
	  return App;
	}();
	
	var app = new App();
	
	function getStore() {
	  return app.store;
	}
	
	function getState() {
	  return app.store.getState();
	}
	
	function dispatch(action) {
	  return app.store.dispatch(action);
	}
	
	exports.default = app;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  paths: {
	    images: 'static/images',
	    fonts: 'static/fonts'
	  },
	  services: {
	    SlackBot: {
	      token: process.env.RBOT_SLACK_TOKEN,
	      enabled: true
	    },
	    Mongo: {
	      url: 'mongodb://localhost:27017/',
	      dbName: 'ryszard-dev',
	      enabled: false
	    }
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _configStore = __webpack_require__(4);
	
	var _configStore2 = _interopRequireDefault(_configStore);
	
	var _configStore3 = __webpack_require__(21);
	
	var _configStore4 = _interopRequireDefault(_configStore3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (true) {
	  module.exports = _configStore2.default;
	}
	
	if (false) {
	  module.exports = _configStore4.default;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(5);
	
	var _reduxThunk = __webpack_require__(6);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reducers = __webpack_require__(7);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var storeEnhancers = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default));
	
	function setupStore(initialState) {
	  return (0, _redux.createStore)(_reducers2.default, initialState, storeEnhancers);
	}
	
	exports.default = setupStore;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(5);
	
	var _reducer = __webpack_require__(8);
	
	var _reducer2 = __webpack_require__(10);
	
	var _reducer3 = __webpack_require__(20);
	
	exports.default = (0, _redux.combineReducers)({
	  messages: _reducer.messages,
	  games: _reducer2.games,
	  status: _reducer3.status
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/** @module messages/reducer */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.messages = messages;
	
	var _actions = __webpack_require__(9);
	
	var messagesActions = _interopRequireWildcard(_actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * @todo Update state type and default value to reflect your model
	 * @todo Implement reducer
	 *
	 * Messages reducer
	 * @param  {[type]}  state  - current state to be reduced
	 * @param  {Object} action - action to be performed on current state
	 * @paraxm  {string} action.type - {@link ACTION_NAME|ACTION_NAME}, ...
	 * @return {[type]} - array representing new state
	 */
	
	function messages() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case messagesActions.RECEIVED_MESSAGE:
	      {
	        return [].concat(_toConsumableArray(state), [action.payload]);
	      }
	    default:
	      return state;
	  }
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	/*=======================================
	=              Action types             =
	=======================================*/
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.receivedMessage = receivedMessage;
	var RECEIVED_MESSAGE = exports.RECEIVED_MESSAGE = 'RECEIVED_MESSAGE';
	
	/* =====  End of Action types  ======*/
	
	/*=======================================
	=            Action creators            =
	=======================================*/
	
	/** @module messages/actions */
	
	/**
	 * @todo Implement action creators for this area
	 *
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link RECEIVED_MESSAGE} action object
	 */
	function receivedMessage(payload) {
	  return {
	    type: RECEIVED_MESSAGE,
	    payload: payload
	  };
	}
	
	/* =====  End of Action creators  ====== */

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	/** @module games/reducer */
	
	exports.games = games;
	
	var _actions = __webpack_require__(11);
	
	var gamesActions = _interopRequireWildcard(_actions);
	
	var _underscore = __webpack_require__(12);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * @todo Update state type and default value to reflect your model
	 * @todo Implement reducer
	 *
	 * Games reducer
	 * @param  {[type]}  state  - current state to be reduced
	 * @param  {Object} action - action to be performed on current state
	 * @param  {string} action.type - {@link ACTION_NAME|ACTION_NAME}, ...
	 * @return {[type]} - array representing new state
	 */
	
	function games() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];
	
	  var payload = action.payload;
	  switch (action.type) {
	    case gamesActions.ADD_GAME:
	      {
	        var _nextState = Object.assign({}, state);
	
	        _nextState[payload.id] = {
	          meta: {
	            channel: payload.channel,
	            organizer: payload.organizer,
	            createdAt: payload.createdAt
	          },
	          players: {
	            available: [],
	            pending: [],
	            accepted: [],
	            rejected: []
	          }
	        };
	
	        return _nextState;
	      }
	
	    case gamesActions.START_GAME:
	      {
	        var nextState = Object.assign({}, state);
	        nextState[payload.gameId].meta.startedAt = payload.startedAt;
	        return nextState;
	      }
	
	    case gamesActions.UPDATE_PLAYERS:
	      {
	        var _nextState2 = Object.assign({}, state);
	        var players = Object.assign({}, _nextState2[payload.gameId].players, payload.players);
	        _nextState2[payload.gameId].players = players;
	        return _nextState2;
	      }
	    case gamesActions.RANDOMIZE_PLAYERS:
	      {
	        var _ret = function () {
	          var nextState = Object.assign({}, state);
	          var newPlayers = [];
	          var playersLeft = [];
	          var players = nextState[payload.gameId].players;
	
	          _underscore2.default.each(payload.playerIds, function (idx) {
	            newPlayers.push(players.available[idx]);
	          });
	
	          players.available = _underscore2.default.filter(players.available, function (player, index) {
	            return _underscore2.default.indexOf(payload.playerIds, index) === -1;
	          });
	
	          players = Object.assign({}, players, {
	            available: players.available,
	            pending: newPlayers
	          });
	
	          nextState[payload.gameId].players = players;
	
	          return {
	            v: nextState
	          };
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	
	    case gamesActions.PLAYER_ACCEPTED:
	      {
	        var _nextState3 = Object.assign({}, state);
	        var game = _nextState3[payload.gameId];
	        var _players = {
	          available: game.players.available,
	          pending: _underscore2.default.without(game.players.pending, payload.playerId),
	          accepted: _underscore2.default.union(game.players.accepted, [payload.playerId]),
	          rejected: game.players.rejected
	        };
	        _nextState3[payload.gameId].players = _players;
	        return _nextState3;
	      }
	
	    case gamesActions.REMOVE_PLAYER:
	      {
	        var _nextState4 = Object.assign({}, state);
	        var _game = _nextState4[payload.gameId];
	        console.log('remove');
	        console.log(_game.players);
	        console.log('remove');
	        var _players2 = Object.assign({}, {
	          available: _game.players.available,
	          pending: _underscore2.default.without(_game.players.pending, payload.playerId),
	          rejected: _underscore2.default.union(_game.players.rejected, [payload.playerId]),
	          accepted: _underscore2.default.without(_game.players.accepted, payload.playerId)
	        });
	        _nextState4[payload.gameId].players = _players2;
	        return _nextState4;
	      }
	
	    case gamesActions.GET_NEW_PLAYER:
	      {
	        var _nextState5 = Object.assign({}, state);
	        var _game2 = _nextState5[payload.gameId];
	
	        var newPlayer = _game2.players.available[_underscore2.default.random(_game2.players.available.length - 1)];
	        console.log('newPlayer ============ ', newPlayer);
	        var _players3 = Object.assign({
	          pending: _underscore2.default.union(_game2.players.pending, [newPlayer]),
	          available: _underscore2.default.without(_game2.players.available, newPlayer),
	          rejected: _game2.players.rejected,
	          accepted: _game2.players.accepted
	        });
	
	        console.log(_players3);
	        _nextState5[payload.gameId].players = _players3;
	
	        return _nextState5;
	      }
	
	    default:
	      return state;
	  }
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ADD_NEW_PLAYER = exports.GET_NEW_PLAYER = exports.REMOVE_PLAYER = exports.PLAYER_ACCEPTED = exports.PLAYER_REJECTED = exports.RANDOMIZE_PLAYERS = exports.UPDATE_PLAYERS = exports.CANCEL_GAME = exports.START_GAME = exports.ADD_GAME = exports.CREATE_GAME = undefined;
	exports.createGame = createGame;
	exports.addGame = addGame;
	exports.startGame = startGame;
	exports.cancelGame = cancelGame;
	exports.updatePlayers = updatePlayers;
	exports.randomizePlayers = randomizePlayers;
	exports.playerAccepted = playerAccepted;
	exports.playerRejected = playerRejected;
	exports.removePlayer = removePlayer;
	exports.getNewPlayer = getNewPlayer;
	exports.addNewPlayer = addNewPlayer;
	
	var _underscore = __webpack_require__(12);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _services = __webpack_require__(13);
	
	var _services2 = _interopRequireDefault(_services);
	
	var _actions = __webpack_require__(18);
	
	var playersActions = _interopRequireWildcard(_actions);
	
	var _actions2 = __webpack_require__(11);
	
	var gamesActions = _interopRequireWildcard(_actions2);
	
	var _actions3 = __webpack_require__(19);
	
	var statusActions = _interopRequireWildcard(_actions3);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*=======================================
	=              Action types             =
	=======================================*/
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	var CREATE_GAME = exports.CREATE_GAME = 'CREATE_GAME';
	
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	var ADD_GAME = exports.ADD_GAME = 'ADD_GAME';
	
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	var START_GAME = exports.START_GAME = 'START_GAME';
	
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	var CANCEL_GAME = exports.CANCEL_GAME = 'CANCEL_GAME';
	
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	var UPDATE_PLAYERS = exports.UPDATE_PLAYERS = 'UPDATE_PLAYERS';
	
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	var RANDOMIZE_PLAYERS = exports.RANDOMIZE_PLAYERS = 'RANDOMIZE_PLAYERS';
	
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	var PLAYER_REJECTED = exports.PLAYER_REJECTED = 'PLAYER_REJECTED';
	
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	var PLAYER_ACCEPTED = exports.PLAYER_ACCEPTED = 'PLAYER_ACCEPTED';
	
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	var REMOVE_PLAYER = exports.REMOVE_PLAYER = 'REMOVE_PLAYER';
	
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	var GET_NEW_PLAYER = exports.GET_NEW_PLAYER = 'GET_NEW_PLAYER';
	
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	var ADD_NEW_PLAYER = exports.ADD_NEW_PLAYER = 'ADD_NEW_PLAYER';
	
	/* =====  End of Action types  ======*/
	
	/*=======================================
	=            Action creators            =
	=======================================*/
	
	/** @module games/actions */
	
	/**
	 * @todo Implement action creators for this area
	 *
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link ACTION_NAME} action object
	 */
	function createGame(id, channel, organizer, ts, botId) {
	  return function (dispatch, getState) {
	    dispatch(addGame(id, channel, organizer, ts));
	    return new Promise(function (resolve, reject) {
	      var context = _services2.default.SlackBot.getContext(channel);
	
	      context.ctx.info({ channel: channel }, function (err, response) {
	        if (err) {
	          reject(err);
	        }
	
	        dispatch(updatePlayers(id, {
	          available: _underscore2.default.without(response[context.name].members, organizer, _services2.default.SlackBot.id),
	          accepted: [organizer]
	        }));
	
	        dispatch(randomizePlayers(id, getRandomPlayersIds(response[context.name].members.length - 2)));
	
	        dispatch(statusActions.updateStatus({
	          gameId: id,
	          status: 'pending'
	        }));
	
	        resolve(response);
	      });
	    });
	  };
	}
	
	/**
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link ACTION_NAME} action object
	 */
	function addGame(id, channel, organizer, ts) {
	  return {
	    type: ADD_GAME,
	    payload: {
	      id: id,
	      channel: channel,
	      organizer: organizer,
	      createdAt: ts
	    }
	  };
	}
	
	/**
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link ACTION_NAME} action object
	 */
	function startGame(gameId, ts) {
	  return {
	    type: START_GAME,
	    payload: {
	      gameId: gameId,
	      startedAt: ts
	    }
	  };
	}
	
	/**
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link CANCEL_GAME} action object
	 */
	function cancelGame(organizerId) {
	  return {
	    type: CANCEL_GAME,
	    payload: {
	      organizerId: organizerId
	    }
	  };
	}
	
	/**
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link UPDATE_PLAYERS} action object
	 */
	function updatePlayers(id, players) {
	  return {
	    type: UPDATE_PLAYERS,
	    payload: {
	      gameId: id,
	      players: players
	    }
	  };
	}
	
	/**
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link RANDOMIZE_PLAYERS} action object
	 */
	function randomizePlayers(gameId, playerIds) {
	  return {
	    type: RANDOMIZE_PLAYERS,
	    payload: {
	      gameId: gameId,
	      playerIds: playerIds
	    }
	  };
	}
	
	/**
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link PLAYER_ACCEPTED} action object
	 */
	function playerAccepted(gameId, playerId) {
	  return {
	    type: PLAYER_ACCEPTED,
	    payload: {
	      gameId: gameId,
	      playerId: playerId
	    }
	  };
	}
	
	/**
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link PLAYER_REJECTED} action object
	 */
	function playerRejected(gameId, playerId) {
	  return function (dispatch) {
	    return new Promise(function (resolve, reject) {
	      dispatch(removePlayer(gameId, playerId));
	      dispatch(getNewPlayer(gameId));
	      resolve();
	    });
	  };
	  // return {
	  //   type: PLAYER_REJECTED,
	  //   payload: {
	  //     player: id
	  //   }
	  // }
	}
	
	/**
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link REMOVE_PLAYER} action object
	 */
	function removePlayer(gameId, playerId) {
	  return {
	    type: REMOVE_PLAYER,
	    payload: {
	      gameId: gameId,
	      playerId: playerId
	    }
	  };
	}
	
	/**
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link GET_NEW_PLAYER} action object
	 */
	function getNewPlayer(id) {
	  console.log('getting new player');
	  return {
	    type: GET_NEW_PLAYER,
	    payload: {
	      gameId: id
	    }
	  };
	}
	
	/**
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link GET_NEW_PLAYER} action object
	 */
	function addNewPlayer(gameId, playerId) {
	  return {
	    type: ADD_NEW_PLAYER,
	    payload: {
	      gameId: gameId,
	      playerId: playerId
	    }
	  };
	}
	
	/* =====  End of Action creators  ======*/
	
	function getRandomPlayersIds(range) {
	  var rand = _underscore2.default.first(_underscore2.default.shuffle(_underscore2.default.range(range)), 3);
	  console.log(rand);
	  return rand;
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("underscore");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bootServices = bootServices;
	
	var _slackBot = __webpack_require__(14);
	
	var _slackBot2 = _interopRequireDefault(_slackBot);
	
	var _dbService = __webpack_require__(16);
	
	var _dbService2 = _interopRequireDefault(_dbService);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Services = {
	  SlackBot: new _slackBot2.default(),
	  Mongo: new _dbService2.default()
	};
	
	exports.default = Services;
	function bootServices(config) {
	  var promises = [];
	  Object.keys(config).forEach(function (key) {
	    if (config[key].enabled) {
	      if (Services[key] && Services[key].boot !== 'undefined ') {
	        console.log('\tBooting up ' + key + ' service');
	        try {
	          promises.push(Services[key].boot(config[key]));
	        } catch (e) {
	          console.log(e);
	        }
	      } else {
	        throw new Error(key + ' service is not defined');
	      }
	    }
	  });
	
	  return Promise.all(promises);
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _botkit = __webpack_require__(15);
	
	var _botkit2 = _interopRequireDefault(_botkit);
	
	var _underscore = __webpack_require__(12);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SlackBot = function () {
	  function SlackBot() {
	    _classCallCheck(this, SlackBot);
	  }
	
	  _createClass(SlackBot, [{
	    key: 'boot',
	    value: function boot(config) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        _this.controller = _botkit2.default.slackbot({
	          debug: false
	        });
	        _this.controller.spawn({
	          token: config.token
	        }).startRTM(function (err, bot, slackResponse) {
	          if (err) {
	            throw new Error(err);
	          }
	          _this.cacheTeamData(slackResponse);
	          _this.registerBot(bot);
	          resolve(slackResponse);
	        });
	      });
	    }
	  }, {
	    key: 'cacheTeamData',
	    value: function cacheTeamData(data) {
	      this.team = {
	        users: data.users,
	        channels: _underscore2.default.map(data.channels, function (channel) {
	          return channel.id;
	        }),
	        groups: _underscore2.default.map(data.groups, function (group) {
	          return group.id;
	        })
	      };
	    }
	  }, {
	    key: 'registerBot',
	    value: function registerBot(bot) {
	      this.bot = bot;
	      this.id = bot.identity.id;
	    }
	  }, {
	    key: 'isGroup',
	    value: function isGroup(id) {
	      return _underscore2.default.indexOf(this.team.groups, id) > -1;
	    }
	  }, {
	    key: 'isChannel',
	    value: function isChannel(id) {
	      return _underscore2.default.indexOf(this.team.channels, id) > -1;
	    }
	  }, {
	    key: 'getContext',
	    value: function getContext(id) {
	      var ctx = {};
	
	      if (this.isGroup(id)) {
	        ctx = {
	          ctx: this.bot.api.groups,
	          name: 'group'
	        };
	      } else {
	        ctx = {
	          ctx: this.bot.api.channels,
	          name: 'channel'
	        };
	      }
	
	      return ctx;
	    }
	  }]);
	
	  return SlackBot;
	}();
	
	exports.default = SlackBot;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("botkit");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mongodb = __webpack_require__(17);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DBService = function () {
	  function DBService() {
	    _classCallCheck(this, DBService);
	  }
	
	  _createClass(DBService, [{
	    key: 'boot',
	    value: function boot(config) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        _mongodb.MongoClient.connect(config.url + config.dbName, function (err, db) {
	          if (err) {
	            console.error('Connection failed', err);
	            reject(err);
	          }
	          console.log('DB connection successful');
	          _this.registerDbConnection(db);
	          resolve(db);
	        });
	      });
	    }
	  }, {
	    key: 'registerDbConnection',
	    value: function registerDbConnection(db) {
	      this.db = db;
	      this.db.collection('tests').insert({ 'message': 'message from app' }, function (err, res) {
	        if (err) {
	          console.error(err);
	        } else {
	          console.log(res);
	        }
	      });
	    }
	  }]);
	
	  return DBService;
	}();
	
	exports.default = DBService;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	/*=======================================
	=              Action types             =
	=======================================*/
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getPlayers = getPlayers;
	var REGISTER_PLAYERS = exports.REGISTER_PLAYERS = 'REGISTER_PLAYERS';
	
	/* =====  End of Action types  ======*/
	
	/*=======================================
	=            Action creators            =
	=======================================*/
	
	/** @module players/actions */
	
	/**
	 * @todo Implement action creators for this area
	 *
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link REGISTER_PLAYERS} action object
	 */
	function getPlayers(payload) {
	  return {
	    type: REGISTER_PLAYERS,
	    payload: payload
	  };
	}
	
	/* =====  End of Action creators  ======*/

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	/*=======================================
	=              Action types             =
	=======================================*/
	/**
	 * @todo Define action types for this area
	 *
	 * [Action name] action type
	 * @constant
	 * @type {[type]}
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateStatus = updateStatus;
	var UPDATE_STATUS = exports.UPDATE_STATUS = 'UPDATE_STATUS';
	
	/* =====  End of Action types  ======*/
	
	/*=======================================
	=            Action creators            =
	=======================================*/
	
	/** @module status/actions */
	
	/**
	 * @todo Implement action creators for this area
	 *
	 * [Action name] action creator
	 * @param {[type]} payload [description]
	 * @return {@link UPDATE_STATUS} action object
	 */
	function updateStatus(payload) {
	  console.log('Updating status');
	  return {
	    type: UPDATE_STATUS,
	    payload: payload
	  };
	}
	
	/* =====  End of Action creators  ======*/

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/** @module status/reducer */
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.status = status;
	
	var _actions = __webpack_require__(19);
	
	var statusActions = _interopRequireWildcard(_actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * @todo Update state type and default value to reflect your model
	 * @todo Implement reducer
	 *
	 * Status reducer
	 * @param  {[type]}  state  - current state to be reduced
	 * @param  {Object} action - action to be performed on current state
	 * @param  {string} action.type - {@link UPDATE_STATUS|UPDATE_STATUS}, ...
	 * @return {[type]} - array representing new state
	 */
	function status() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? { status: 'idle' } : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case statusActions.UPDATE_STATUS:
	      return Object.assign({}, state, action.payload);
	    default:
	      return state;
	  }
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(5);
	
	var _reduxThunk = __webpack_require__(6);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reducers = __webpack_require__(7);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var storeEnhancers = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default));
	
	function setupStore(initialState) {
	  return (0, _redux.createStore)(_reducers2.default, initialState, storeEnhancers);
	}
	
	exports.default = setupStore;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _services = __webpack_require__(13);
	
	var _services2 = _interopRequireDefault(_services);
	
	var _gameService = __webpack_require__(23);
	
	var _gameService2 = _interopRequireDefault(_gameService);
	
	var _ticker = __webpack_require__(25);
	
	var _ticker2 = _interopRequireDefault(_ticker);
	
	var _app = __webpack_require__(1);
	
	var _actions = __webpack_require__(9);
	
	var messageActions = _interopRequireWildcard(_actions);
	
	var _actions2 = __webpack_require__(18);
	
	var playersActions = _interopRequireWildcard(_actions2);
	
	var _actions3 = __webpack_require__(11);
	
	var gamesActions = _interopRequireWildcard(_actions3);
	
	var _actions4 = __webpack_require__(19);
	
	var statusActions = _interopRequireWildcard(_actions4);
	
	var _config = __webpack_require__(26);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _commandHandlers = __webpack_require__(27);
	
	var _commandHandlers2 = _interopRequireDefault(_commandHandlers);
	
	var _underscore = __webpack_require__(12);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var RBot = function () {
	  function RBot() {
	    _classCallCheck(this, RBot);
	
	    this.ticker = new _ticker2.default();
	    this.gameStatusTicker = this.ticker.every(5000).do(_commandHandlers2.default.periodicEventsHandler);
	
	    this.initializeListeners();
	  }
	
	  _createClass(RBot, [{
	    key: 'initializeListeners',
	    value: function initializeListeners() {
	      var _this = this;
	
	      _services2.default.SlackBot.controller.on('direct_mention', _commandHandlers2.default.directMentionHandler);
	
	      _config2.default.forEach(function (v, k) {
	        var handlerName = _this.getHandlerName(k);
	        console.log(_commandHandlers2.default[handlerName]);
	        _services2.default.SlackBot.controller.hears(v.phrases, v.triggers, _commandHandlers2.default[handlerName]);
	      });
	    }
	  }, {
	    key: 'getHandlerName',
	    value: function getHandlerName(capitalizedKeyword) {
	      var keyword = capitalizedKeyword.toLowerCase().split('_');
	
	      return _underscore2.default.first(keyword).concat(_underscore2.default.map(_underscore2.default.rest(keyword), function (word) {
	        return word.charAt(0).toUpperCase() + word.slice(1);
	      })).concat('Handler');
	    }
	  }]);
	
	  return RBot;
	}();
	
	exports.default = RBot;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _underscore = __webpack_require__(12);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _shortid = __webpack_require__(24);
	
	var _shortid2 = _interopRequireDefault(_shortid);
	
	var _app = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameService = function () {
	  function GameService() {
	    _classCallCheck(this, GameService);
	  }
	
	  _createClass(GameService, [{
	    key: 'createId',
	    value: function createId() {
	      return _shortid2.default.generate();
	    }
	  }, {
	    key: 'getStatus',
	    value: function getStatus() {
	      return (0, _app.getState)().status.status;
	    }
	  }, {
	    key: 'getGame',
	    value: function getGame(id) {
	      return (0, _app.getState)().games[id];
	    }
	  }, {
	    key: 'getCurrentGame',
	    value: function getCurrentGame() {
	      return (0, _app.getState)().games[this.getCurrentGameId()];
	    }
	  }, {
	    key: 'getCurrentGameOrganizer',
	    value: function getCurrentGameOrganizer() {
	      return this.getCurrentGame() ? this.getCurrentGame().meta.organizer : undefined;
	    }
	  }, {
	    key: 'getCurrentGamePlayers',
	    value: function getCurrentGamePlayers() {
	      return this.getCurrentGame() ? this.getCurrentGame().players : undefined;
	    }
	  }, {
	    key: 'getCurrentGameId',
	    value: function getCurrentGameId() {
	      return (0, _app.getState)().status.gameId;
	    }
	  }, {
	    key: 'getCurrentGameCreationTime',
	    value: function getCurrentGameCreationTime() {
	      return this.getMeta(this.getCurrentGameId()).createdAt;
	    }
	  }, {
	    key: 'getCurrentGameStartTime',
	    value: function getCurrentGameStartTime() {
	      return this.getMeta(this.getCurrentGameId()).startedAt;
	    }
	  }, {
	    key: 'getCurrentGameTime',
	    value: function getCurrentGameTime() {
	      return Math.floor((Date.now() - this.getCurrentGameStartTime()) / 1000);
	    }
	  }, {
	    key: 'getCurrentGameElapsedTime',
	    value: function getCurrentGameElapsedTime() {
	      return 16 - Math.ceil(this.getCurrentGameTime() / 60);
	    }
	  }, {
	    key: 'getMeta',
	    value: function getMeta(id) {
	      return (0, _app.getState)().games[id].meta;
	    }
	  }, {
	    key: 'getOrganizer',
	    value: function getOrganizer(id) {
	      return (0, _app.getState)().games[id].meta.organizer;
	    }
	  }, {
	    key: 'getPlayers',
	    value: function getPlayers(id) {
	      return (0, _app.getState)().games[id].players;
	    }
	  }, {
	    key: 'getRecentlyAddedPlayer',
	    value: function getRecentlyAddedPlayer(id) {
	      return _underscore2.default.last((0, _app.getState)().games[id].players.pending);
	    }
	  }, {
	    key: 'getAvailablePlayers',
	    value: function getAvailablePlayers(id) {
	      return (0, _app.getState)().games[id].players.available;
	    }
	  }, {
	    key: 'getPendingPlayers',
	    value: function getPendingPlayers(id) {
	      return (0, _app.getState)().games[id].players.pending;
	    }
	  }, {
	    key: 'getRejectedPlayers',
	    value: function getRejectedPlayers(id) {
	      return (0, _app.getState)().games[id].players.rejected;
	    }
	  }, {
	    key: 'getAcceptedPlayers',
	    value: function getAcceptedPlayers(id) {
	      return (0, _app.getState)().games[id].players.accepted;
	    }
	  }, {
	    key: 'countAvailablePlayers',
	    value: function countAvailablePlayers(id) {
	      return (0, _app.getState)().games[id].players.available.length;
	    }
	  }, {
	    key: 'countAcceptedPlayers',
	    value: function countAcceptedPlayers(id) {
	      return (0, _app.getState)().games[id].players.accepted.length;
	    }
	  }, {
	    key: 'isOrganizedBy',
	    value: function isOrganizedBy(id) {
	      return this.getCurrentGameOrganizer() === id;
	    }
	  }, {
	    key: 'isUserInvited',
	    value: function isUserInvited(id) {
	      return this.getCurrentGame() && _underscore2.default.indexOf(this.getCurrentGamePlayers().pending, id) > -1;
	    }
	  }, {
	    key: 'hasUserAccepted',
	    value: function hasUserAccepted(id) {
	      return this.getCurrentGame() && _underscore2.default.indexOf(this.getCurrentGamePlayers().accepted, id) > -1;
	    }
	  }, {
	    key: 'isIdle',
	    value: function isIdle() {
	      return this.getStatus() === 'idle';
	    }
	  }, {
	    key: 'isPending',
	    value: function isPending() {
	      return this.getStatus() === 'pending';
	    }
	  }, {
	    key: 'isOccupied',
	    value: function isOccupied() {
	      return this.getStatus() === 'occupied';
	    }
	  }]);
	
	  return GameService;
	}();
	
	var gameService = new GameService();
	
	exports.default = gameService;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("shortid");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _shortid = __webpack_require__(24);
	
	var _shortid2 = _interopRequireDefault(_shortid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ticker = function () {
	  function Ticker() {
	    _classCallCheck(this, Ticker);
	
	    this.tickers = {};
	
	    this.every = this.every.bind(this);
	    this.createCallback = this.createCallback.bind(this);
	    this.do = this.do.bind(this);
	    this.remove = this.remove.bind(this);
	  }
	
	  _createClass(Ticker, [{
	    key: 'every',
	    value: function every(interval) {
	      return this.createCallback(_shortid2.default.generate(), interval);
	    }
	  }, {
	    key: 'createCallback',
	    value: function createCallback(id, interval) {
	      var _this = this;
	
	      return {
	        id: id,
	        do: function _do(callback) {
	          _this.do(id, interval, callback);
	          return id;
	        }
	      };
	    }
	  }, {
	    key: 'do',
	    value: function _do(id, interval, callback) {
	      if (this.tickers[id] === undefined) {
	        console.log('Setting ticker ', id);
	        this.tickers[id] = setInterval(callback, interval);
	        console.log('Returning ', id);
	        return id;
	      } else {
	        console.log('Ticker is defined');
	      }
	
	      throw new TypeError('Ticker of this id is already defined');
	    }
	  }, {
	    key: 'remove',
	    value: function remove(id) {
	      console.log('Removing ticker ', id);
	      if (this.tickers[id] !== undefined) {
	        clearInterval(this.tickers[id]);
	        delete this.tickers[id];
	        return true;
	      }
	      throw new TypeError('Ticker is not defined');
	    }
	  }]);
	
	  return Ticker;
	}();
	
	exports.default = Ticker;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var RBotConfig = new Map();
	
	RBotConfig.set('START_GAME', {
	  phrases: ['let\'s', 'do it', 'zagrajmy', 'it\'s', 'time', '!', 'gramy'],
	  triggers: ['direct_mention', 'mention']
	});
	
	RBotConfig.set('CONFIRM_GAME', {
	  phrases: ['^ok$', '^yes$'],
	  triggers: ['direct_mention', 'mention']
	});
	
	RBotConfig.set('REJECT_GAME', {
	  phrases: ['^no$', '^spierdalaj$'],
	  triggers: ['direct_mention', 'mention']
	});
	
	RBotConfig.set('CANCEL_GAME', {
	  phrases: ['^fuck it$', '^cancel$'],
	  triggers: ['direct_mention', 'mention']
	});
	
	RBotConfig.set('GET_STATUS', {
	  phrases: ['^status$', '^what\'s up$'],
	  triggers: ['direct_mention', 'mention']
	});
	
	RBotConfig.set('GET_HELP', {
	  phrases: ['^help$', '^hello$'],
	  triggers: ['direct_mention', 'mention']
	});
	
	RBotConfig.set('PING', {
	  phrases: ['^ping$'],
	  triggers: ['direct_mention', 'mention']
	});
	
	RBotConfig.set('CONSOLE_LOG', {
	  phrases: ['^whip it$'],
	  triggers: ['direct_mention', 'mention']
	});
	
	exports.default = RBotConfig;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _services = __webpack_require__(13);
	
	var _services2 = _interopRequireDefault(_services);
	
	var _gameService = __webpack_require__(23);
	
	var _gameService2 = _interopRequireDefault(_gameService);
	
	var _app = __webpack_require__(1);
	
	var _actions = __webpack_require__(9);
	
	var messageActions = _interopRequireWildcard(_actions);
	
	var _actions2 = __webpack_require__(18);
	
	var playersActions = _interopRequireWildcard(_actions2);
	
	var _actions3 = __webpack_require__(11);
	
	var gamesActions = _interopRequireWildcard(_actions3);
	
	var _actions4 = __webpack_require__(19);
	
	var statusActions = _interopRequireWildcard(_actions4);
	
	var _underscore = __webpack_require__(12);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function directMentionHandler(bot, msg) {
	  (0, _app.dispatch)(messageActions.receivedMessage(msg));
	
	  if (msg.text === '' || msg.text === ':') {
	    bot.reply(msg, 'Well, try `@ryszard hello` to get some help <@' + msg.user + '>');
	  }
	}
	
	function startGameHandler(bot, msg) {
	  var id = _gameService2.default.createId();
	
	  if (_gameService2.default.isIdle()) {
	    (0, _app.dispatch)(gamesActions.createGame(id, msg.channel, msg.user, Date.now())).then(function (response) {
	      bot.reply(msg, getPlayersString(_gameService2.default.getPendingPlayers(id)) + ' do you wanna play?');
	    });
	  } else if (_gameService2.default.isPending()) {
	    bot.reply(msg, '_There is a game I\'m organizing right now. Come back later :)_');
	  } else {
	    bot.reply(msg, '_Sorry, there is a game going on right now... It will take ~' + _gameService2.default.getCurrentGameElapsedTime() + 'min _'); // eslint-disable-line
	  }
	}
	
	function confirmGameHandler(bot, msg) {
	  var game = _gameService2.default.getCurrentGame();
	  var reply = 'Cool, great you have joined!';
	
	  if (_gameService2.default.isIdle()) {
	    bot.reply(msg, '_No game going on right now! You can always start a new one!_');
	    return;
	  }
	
	  if (_gameService2.default.isOrganizedBy(msg.user)) {
	    reply = '_Sorry, you are the organizer, you have already accepted..._';
	    bot.reply(msg, reply);
	    return false;
	  }
	
	  if (_gameService2.default.hasUserAccepted(msg.user)) {
	    bot.reply(msg, '_You have already joined this game_');
	    return false;
	  }
	
	  if (!_gameService2.default.isUserInvited(msg.user)) {
	    bot.reply(msg, '_Sorry, you are not invited to this game_');
	    return false;
	  }
	
	  if (_gameService2.default.isPending()) {
	    (0, _app.dispatch)(gamesActions.playerAccepted(_gameService2.default.getCurrentGameId(), msg.user));
	  }
	
	  bot.reply(msg, reply);
	
	  return this.gameStatusHandler(msg);
	}
	
	function rejectGameHandler(bot, msg) {
	  var game = _gameService2.default.getCurrentGame();
	  var gameId = _gameService2.default.getCurrentGameId();
	  var reply = '';
	
	  if (typeof game === 'undefined') {
	    bot.reply(msg, '_Say what? No to what?!_');
	    return;
	  }
	
	  if (_gameService2.default.isIdle()) {
	    bot.reply('_Aaaaaaa, w00t?! `@ryszard help`_');
	    return;
	  }
	  if (_gameService2.default.isOrganizedBy(msg.user)) {
	    bot.reply(msg, '_You are the organizer, you can only cancel a game:_ `@ryszard cancel`');
	    return;
	  }
	
	  if (_gameService2.default.isPending() && _gameService2.default.countAvailablePlayers(gameId) > 0) {
	    (0, _app.dispatch)(gamesActions.playerRejected(gameId, msg.user)).then(function () {
	      bot.reply(msg, '<@' + msg.user + '> rejected.\n*<@' + _gameService2.default.getRecentlyAddedPlayer(gameId) + '> what about you?*'); // eslint-disable-line
	    });
	    return;
	  } else {
	    reply = '<@' + msg.user + '> was the last one available. Try again later!';
	    (0, _app.dispatch)(statusActions.updateStatus({
	      gameId: 1,
	      status: 'idle'
	    }));
	  }
	
	  bot.reply(msg, reply);
	}
	
	function cancelGameHandler(bot, message) {
	  if (_gameService2.default.isIdle()) {
	    bot.reply(message, '_Cancel w00t?!_');
	    return;
	  }
	  bot.reply(message, '_All right, maybe next time..._');
	  (0, _app.dispatch)(statusActions.updateStatus({
	    gameId: -1,
	    status: 'idle'
	  }));
	}
	
	function getStatusHandler(bot, msg) {
	  var organizer = _gameService2.default.getCurrentGameOrganizer();
	  var players = _gameService2.default.getCurrentGamePlayers();
	  var reply = void 0;
	
	  if (_gameService2.default.isIdle()) {
	    bot.reply(msg, '_There is no game going on now. You can start one:) Need some help?_ `@ryszard help`'); // eslint-disable-line
	    return;
	  }
	
	  if (_gameService2.default.isPending()) {
	    reply = {
	      'text': '*There is a pending game requested by <@' + organizer + '>*',
	      'attachments': []
	    };
	    if (players.pending.length > 0) {
	      reply.attachments.push({
	        'color': '#0000ff',
	        'text': 'Pending players: ' + getPlayersString(players.pending)
	      });
	    }
	
	    if (players.accepted.length > 0) {
	      reply.attachments.push({
	        'color': '#00ff00',
	        'text': 'Accepted players: ' + getPlayersString(players.accepted)
	      });
	    }
	
	    if (players.rejected.length > 0) {
	      reply.attachments.push({
	        'color': '#ff0000',
	        'text': 'Rejected players: ' + getPlayersString(players.rejected)
	      });
	    }
	  }
	
	  if (_gameService2.default.isOccupied()) {
	    reply = {
	      'text': '*There is a game going on requested by <@' + organizer + '>*',
	      'attachments': []
	    };
	
	    reply.attachments.push({
	      'color': '#00ff00',
	      'text': 'Accepted players: ' + getPlayersString(players)
	    });
	
	    reply.attachments.push({
	      'color': '#0000ff',
	      'text': 'Elapsed time: ~' + Math.ceil(_gameService2.default.getCurrentGameTime() / 60) + ' min'
	    });
	  }
	  bot.reply(msg, reply);
	}
	
	function periodicEventsHandler() {
	  if (_gameService2.default.getStatus() === 'occupied' && _gameService2.default.getCurrentGameTime() > 15 * 60) {
	    (0, _app.dispatch)(statusActions.updateStatus({
	      gameId: -1,
	      status: 'idle'
	    }));
	    console.log('All right, its time for a new game...');
	  }
	}
	
	function gameStatusHandler(message) {
	  var players = _gameService2.default.getCurrentGamePlayers();
	
	  if (typeof players === 'undefined') {
	    return false;
	  }
	
	  if (players.accepted.length === 4) {
	    var playersString = getPlayersString(players.accepted);
	
	    _services2.default.SlackBot.bot.reply(message, playersString + ' let\'s play!');
	    (0, _app.dispatch)(gamesActions.startGame(_gameService2.default.getCurrentGameId(), Date.now()));
	    (0, _app.dispatch)(statusActions.updateStatus({
	      gameId: _gameService2.default.getCurrentGameId(),
	      status: 'occupied'
	    }));
	
	    return true;
	  } else {
	    console.log('Waiting for  ' + players.pending.length + ' players ...');
	    return false;
	  }
	}
	
	function pingHandler(bot, message) {
	  if (_gameService2.default.isPending()) {
	    var reply = 'One shall answer when asked ';
	    reply += getPlayersString(_gameService2.default.getCurrentGamePlayers().pending) + '!';
	    bot.reply(message, reply);
	  } else {
	    bot.reply(message, '_Ping yourself, there is no one I could ping..._');
	  }
	}
	
	function getHelpHandler(bot, message) {
	  /* eslint-disable max-len */
	  var reply = "_Hi, I'm *Ryszard* and I will organize a foosball team for you :heart:_ \n\n";
	  reply += '_Let me introduce you to the language I speak:_\n';
	  reply += '=====================:heart::soccer::heart:=====================\n';
	  reply += "`@ryszard let's do it`, `@ryszard it's time` `@ryszard gramy` - _that's how you tell me that you are looking for a team. I'll as random 3 ppl if they want to play_\n";
	  reply += '`@ryszard ok` _if you are willing to play_\n';
	  reply += "`@ryszard no` _if you don't want to play. I'll try to ask another person if she accepts the challange_\n";
	  reply += '`@ryszard cancel` _if you want to cancel your game_\n';
	  reply += '`@ryszard help`, `@ryszard hello` _if you need some help on how to talk with me_\n';
	  reply += '`@ryszard status` _if you need to know some details about current game being planned_ \n';
	  reply += '=====================:heart::soccer::heart:=====================\n';
	  /* eslint-enable max-len */
	  bot.reply(message, reply);
	}
	
	function consoleLogHandler(bot, message) {
	  bot.reply(message, 'Roger!');
	}
	
	function getPlayersString(players) {
	  return _underscore2.default.map(players, function (player) {
	    return '<@' + player + '>';
	  }).join(', ');
	}
	
	exports.default = {
	  directMentionHandler: directMentionHandler,
	  startGameHandler: startGameHandler,
	  confirmGameHandler: confirmGameHandler,
	  rejectGameHandler: rejectGameHandler,
	  cancelGameHandler: cancelGameHandler,
	  getStatusHandler: getStatusHandler,
	  getHelpHandler: getHelpHandler,
	  pingHandler: pingHandler,
	  consoleLogHandler: consoleLogHandler,
	  periodicEventsHandler: periodicEventsHandler
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ }
/******/ ]);