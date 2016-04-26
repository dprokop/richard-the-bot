/* global describe, beforeEach, it, expect*/

var deepFreeze = require('deep-freeze')
var games = require('../reducer.js').games
var assert = require('assert')

describe('Games reducer', () => {
  var timestamp
  beforeEach(() => {
    timestamp = Date.now()
  })

  it('adds new game object', () => {
    var stateBefore = {}
    var stateAfter = {
      'abc': {
        meta: {
          channel: 1,
          organizer: 'Dominik',
          createdAt: timestamp
        },
        players: {
          available: [],
          pending: [],
          accepted: [],
          rejected: []
        }
      }
    }

    var action = {
      type: 'ADD_GAME',
      payload: {
        id: 'abc',
        channel: 2,
        organizer: 'Dominik',
        createdAt: timestamp
      }
    }

    deepFreeze(stateBefore)
    var result = games(stateBefore, action)
    assert.deepEqual(result, stateAfter)
  })

  it('sets start time timestamp for a game that is started', () => {
    var stateBefore = {
      'abc': {
        meta: {
          channel: 1,
          organizer: 'Dominik',
          createdAt: timestamp
        },
        players: {
          available: [],
          pending: [],
          accepted: [],
          rejected: []
        }
      }
    }

    var stateAfter = {
      'abc': {
        meta: {
          channel: 1,
          organizer: 'Dominik',
          createdAt: timestamp,
          startedAt: timestamp
        },
        players: {
          available: [],
          pending: [],
          accepted: [],
          rejected: []
        }
      }
    }

    var action = {
      type: 'START_GAME',
      payload: {
        gameId: 'abc',
        startedAt: timestamp
      }
    }

    var result = games(stateBefore, action)
    assert.deepEqual(result, stateAfter)
  })

  it('updates players arrays for a given game', () => {
    var stateBefore = {
      'abc': {
        meta: {
          channel: 1,
          organizer: 'Dominik',
          createdAt: timestamp
        },
        players: {
          available: [],
          pending: [],
          accepted: [],
          rejected: []
        }
      }
    }

    var stateAfter = {
      'abc': {
        meta: {
          channel: 1,
          organizer: 'Dominik',
          createdAt: timestamp
        },
        players: {
          available: [1,2,3],
          pending: [4,5,6],
          accepted: [],
          rejected: []
        }
      }
    }

    var action = {
      type: 'UPDATE_PLAYERS',
      payload: {
        gameId: 'abc',
        players: {
          available: [1,2,3],
          pending: [4,5,6],
        }
      }
    }

    var result = games(stateBefore, action)
    assert.deepEqual(result, stateAfter)
  })

  it('sets pending players to the ones that are drawn', () => {
    var action = {
      type: 'RANDOMIZE_PLAYERS',
      payload: {
        gameId: 'abc',
        playerIds: [0,5,2]
      }
    }

    var stateBefore = {
      'abc': {
        meta: {
          channel: 1,
          organizer: 'Dominik',
          createdAt: timestamp
        },
        players: {
          available: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          pending: [],
          accepted: [],
          rejected: []
        }
      }
    }

    var stateAfter = {
      'abc': {
        meta: {
          channel: 1,
          organizer: 'Dominik',
          createdAt: timestamp
        },
        players: {
          available: [2, 4, 5, 7, 8, 9, 10],
          pending: [1, 6, 3],
          accepted: [],
          rejected: []
        }
      }
    }

    var result = games(stateBefore, action)
    assert.deepEqual(result, stateAfter)
  })
})
