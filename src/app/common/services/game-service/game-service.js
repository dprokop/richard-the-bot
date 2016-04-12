import _ from 'underscore'
import shortid from 'shortid'
import { getState } from '../../../app'

class GameService {
  createId () {
    return shortid.generate()
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

  getCurrentGameOrganizer () {
    return this.getCurrentGame() ? this.getCurrentGame().meta.organizer : undefined
  }

  getCurrentGamePlayers () {
    return this.getCurrentGame() ? this.getCurrentGame().players : undefined
  }

  getCurrentGameId () {
    return getState().status.gameId
  }

  getCurrentGameCreationTime () {
    return this.getMeta(this.getCurrentGameId()).createdAt
  }

  getCurrentGameStartTime () {
    return this.getMeta(this.getCurrentGameId()).startedAt
  }

  getCurrentGameTime () {
    return Math.floor((Date.now() - this.getCurrentGameStartTime()) / 1000)
  }

  getCurrentGameElapsedTime () {
    return 16 - Math.ceil(this.getCurrentGameTime() / 60)
  }

  getMeta (id) {
    return getState().games[id].meta
  }

  getOrganizer (id) {
    return getState().games[id].meta.organizer
  }

  getPlayers (id) {
    return getState().games[id].players
  }

  getRecentlyAddedPlayer (id) {
    return _.last(getState().games[id].players.pending)
  }

  getAvailablePlayers (id) {
    return getState().games[id].players.available
  }

  getPendingPlayers (id) {
    console.log(getState().games[id].players.pending)
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
