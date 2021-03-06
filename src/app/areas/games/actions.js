import _ from 'underscore'
import Services from '../../common/services'
import * as playersActions from '../players/actions'
import * as gamesActions from '../games/actions'
import * as statusActions from '../status/actions'

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
export const CREATE_GAME = 'CREATE_GAME'

/**
 * @todo Define action types for this area
 *
 * [Action name] action type
 * @constant
 * @type {[type]}
 */
export const ADD_GAME = 'ADD_GAME'

/**
 * @todo Define action types for this area
 *
 * [Action name] action type
 * @constant
 * @type {[type]}
 */
export const START_GAME = 'START_GAME'

/**
 * @todo Define action types for this area
 *
 * [Action name] action type
 * @constant
 * @type {[type]}
 */
export const CANCEL_GAME = 'CANCEL_GAME'

/**
 * @todo Define action types for this area
 *
 * [Action name] action type
 * @constant
 * @type {[type]}
 */
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS'

/**
 * @todo Define action types for this area
 *
 * [Action name] action type
 * @constant
 * @type {[type]}
 */
export const RANDOMIZE_PLAYERS = 'RANDOMIZE_PLAYERS'

/**
 * @todo Define action types for this area
 *
 * [Action name] action type
 * @constant
 * @type {[type]}
 */
export const PLAYER_REJECTED = 'PLAYER_REJECTED'

/**
 * @todo Define action types for this area
 *
 * [Action name] action type
 * @constant
 * @type {[type]}
 */
export const PLAYER_ACCEPTED = 'PLAYER_ACCEPTED'

/**
 * @todo Define action types for this area
 *
 * [Action name] action type
 * @constant
 * @type {[type]}
 */
export const REMOVE_PLAYER = 'REMOVE_PLAYER'

/**
 * @todo Define action types for this area
 *
 * [Action name] action type
 * @constant
 * @type {[type]}
 */
export const GET_NEW_PLAYER = 'GET_NEW_PLAYER'

/**
 * @todo Define action types for this area
 *
 * [Action name] action type
 * @constant
 * @type {[type]}
 */
export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER'

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
export function createGame (id, channel, organizer, ts, botId) {
  return (dispatch, getState) => {
    dispatch(addGame(id, channel, organizer, ts))
    return new Promise((resolve, reject) => {
      let context = Services.SlackBot.getContext(channel)

      context.ctx.info({channel: channel}, (err, response) => {
        if (err) {
          reject(err)
        }

        dispatch(
          updatePlayers(
            id,
            {
              available: _.without(response[context.name].members, organizer, Services.SlackBot.id),
              accepted: [organizer]
            }
          )
        )

        dispatch(
          randomizePlayers(
            id,
            getRandomPlayersIds(response[context.name].members.length - 2)
          )
        )

        dispatch(statusActions.updateStatus({
          gameId: id,
          status: 'pending'
        }))

        resolve(response)
      })
    })
  }
}

/**
 * [Action name] action creator
 * @param {[type]} payload [description]
 * @return {@link ACTION_NAME} action object
 */
export function addGame (id, channel, organizer, ts) {
  return {
    type: ADD_GAME,
    payload: {
      id: id,
      channel: channel,
      organizer: organizer,
      createdAt: ts
    }
  }
}

/**
 * [Action name] action creator
 * @param {[type]} payload [description]
 * @return {@link ACTION_NAME} action object
 */
export function startGame (gameId, ts) {
  return {
    type: START_GAME,
    payload: {
      gameId: gameId,
      startedAt: ts
    }
  }
}

/**
 * [Action name] action creator
 * @param {[type]} payload [description]
 * @return {@link CANCEL_GAME} action object
 */
export function cancelGame (organizerId) {
  return {
    type: CANCEL_GAME,
    payload: {
      organizerId: organizerId
    }
  }
}

/**
 * [Action name] action creator
 * @param {[type]} payload [description]
 * @return {@link UPDATE_PLAYERS} action object
 */
export function updatePlayers (id, players) {
  return {
    type: UPDATE_PLAYERS,
    payload: {
      gameId: id,
      players: players
    }
  }
}

/**
 * [Action name] action creator
 * @param {[type]} payload [description]
 * @return {@link RANDOMIZE_PLAYERS} action object
 */
export function randomizePlayers (gameId, playerIds) {
  return {
    type: RANDOMIZE_PLAYERS,
    payload: {
      gameId: gameId,
      playerIds: playerIds
    }
  }
}

/**
 * [Action name] action creator
 * @param {[type]} payload [description]
 * @return {@link PLAYER_ACCEPTED} action object
 */
export function playerAccepted (gameId, playerId) {
  return {
    type: PLAYER_ACCEPTED,
    payload: {
      gameId: gameId,
      playerId: playerId
    }
  }
}

/**
 * [Action name] action creator
 * @param {[type]} payload [description]
 * @return {@link PLAYER_REJECTED} action object
 */
export function playerRejected (gameId, playerId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(removePlayer(gameId, playerId))
      dispatch(getNewPlayer(gameId))
      resolve()
    })
  }
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
export function removePlayer (gameId, playerId) {
  return {
    type: REMOVE_PLAYER,
    payload: {
      gameId: gameId,
      playerId: playerId
    }
  }
}

/**
 * [Action name] action creator
 * @param {[type]} payload [description]
 * @return {@link GET_NEW_PLAYER} action object
 */
export function getNewPlayer (id) {
  console.log('getting new player')
  return {
    type: GET_NEW_PLAYER,
    payload: {
      gameId: id
    }
  }
}

/**
 * [Action name] action creator
 * @param {[type]} payload [description]
 * @return {@link GET_NEW_PLAYER} action object
 */
export function addNewPlayer (gameId, playerId) {
  return {
    type: ADD_NEW_PLAYER,
    payload: {
      gameId: gameId,
      playerId: playerId
    }
  }
}

/* =====  End of Action creators  ======*/

function getRandomPlayersIds (range) {
  var rand = (_.first(_.shuffle(_.range(range)), 3))
  console.log(rand)
  return rand
}
