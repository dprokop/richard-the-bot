
/** @module games/reducer */

import * as gamesActions from './actions'
import _ from 'underscore'

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

export function games (state = {}, action) {
  var payload = action.payload
  switch (action.type) {
    case gamesActions.ADD_GAME: {
      let nextState = Object.assign({}, state)

      nextState[payload.id] = {
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
      }

      return nextState
    }

    case gamesActions.START_GAME: {
      var nextState = Object.assign({}, state)
      nextState[payload.gameId].meta.startedAt = payload.startedAt
      return nextState
    }

    case gamesActions.UPDATE_PLAYERS: {
      let nextState = Object.assign({}, state)
      let players = Object.assign({}, nextState[payload.gameId].players, payload.players)
      nextState[payload.gameId].players = players
      return nextState
    }
    case gamesActions.RANDOMIZE_PLAYERS: {
      let nextState = Object.assign({}, state)
      let newPlayers = []
      let playersLeft = []
      let players = nextState[payload.gameId].players

      _.each(payload.playerIds, (idx) => {
        newPlayers.push(players.available[idx])
      })

      players.available = _.filter(players.available, (player, index) => {
        return _.indexOf(payload.playerIds, index) === -1
      })

      players = Object.assign({}, players, {
        available: players.available,
        pending: newPlayers
      })

      nextState[payload.gameId].players = players

      return nextState
    }

    case gamesActions.PLAYER_ACCEPTED: {
      let nextState = Object.assign({}, state)
      let game = nextState[payload.gameId]
      let players = {
        available: game.players.available,
        pending: _.without(game.players.pending, payload.playerId),
        accepted: _.union(game.players.accepted, [payload.playerId]),
        rejected: game.players.rejected
      }
      nextState[payload.gameId].players = players
      return nextState
    }

    case gamesActions.REMOVE_PLAYER: {
      let nextState = Object.assign({}, state)
      let game = nextState[payload.gameId]
      console.log('remove')
      console.log(game.players)
      console.log('remove')
      let players = Object.assign({}, {
        available: game.players.available,
        pending: _.without(game.players.pending, payload.playerId),
        rejected: _.union(game.players.rejected, [payload.playerId]),
        accepted: _.without(game.players.accepted, payload.playerId)
      })
      nextState[payload.gameId].players = players
      return nextState
    }

    case gamesActions.GET_NEW_PLAYER: {
      let nextState = Object.assign({}, state)
      let game = nextState[payload.gameId]

      var newPlayer = game.players.available[_.random(game.players.available.length - 1)]
      console.log('newPlayer ============ ', newPlayer)
      let players = Object.assign({
        pending: _.union(game.players.pending, [newPlayer]),
        available: _.without(game.players.available, newPlayer),
        rejected: game.players.rejected,
        accepted: game.players.accepted
      })

      console.log(players)
      nextState[payload.gameId].players = players

      return nextState
    }

    default:
      return state
  }
}
