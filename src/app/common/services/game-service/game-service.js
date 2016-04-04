import _ from 'underscore'
import { getState } from '../../../app'

class GameService {
  createId (timespan) {
    return timespan.split('.')[0]
  }

  getStatus () {
    return getState().status.status
  }

  getGame (id) {
    return getState().games[id]
  }

  getCurrentGame () {
    return getState().games[this.getCurrentGameId()]
  }

  getCurrentGameId () {
    return getState().status.gameId
  }

  getCurrentGameStartTime () {
    return getState().status.startedAt
  }

  getMeta (id) {
    return getState().games[id].meta
  }

  getOrganizer (id) {
    return getState().games[id].meta.createdBy
  }

  getPlayers (id) {
    console.log(id)
    return getState().games[id].players
  }

  getAvailablePlayers (id) {
    return getState().games[id].players.available
  }

  getPendingPlayers (id) {
    return getState().games[id].players.pending
  }

  getRejectedPlayers (id) {
    return getState().games[id].players.rejected
  }

  getAcceptedPlayers (id) {
    return getState().games[id].players.accepted
  }

  countAvailablePlayers (id) {
    return getState().games[id].players.available.length
  }

}

export default GameService
