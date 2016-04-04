import Services from '../../common/services'
import { getStore, dispatch } from '../../app'
import * as messageActions from '../../areas/messages/actions'
import * as playersActions from '../../areas/players/actions'
import * as gamesActions from '../../areas/games/actions'
import * as statusActions from '../../areas/status/actions'
import KeywordsConfig from './config.js'

import _ from 'underscore'

var GameService = Services.Game

class RBot {
  constructor () {
    this.directMentionHandler = this.directMentionHandler.bind(this)
    this.confirmGameHandler = this.confirmGameHandler.bind(this)
    this.initializeListeners()
  }

  initializeListeners () {
    // console.log(this)
    Services.SlackBot.controller.on('direct_mention', this.directMentionHandler)
    Services.SlackBot.controller.on('bot_added', this.initializeData)
    Services.SlackBot.controller.on('bot_changed', this.initializeData)

    KeywordsConfig.forEach((v, k) => {
    //  console.log(this)
      var keyword = k.toLowerCase().split('_')
      var handlerName = (_.first(keyword).concat(_.map(_.rest(keyword), (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1) + 'Handler'
      })))
      Services.SlackBot.controller.hears(v.phrases, v.triggers, this[handlerName])
    })
  }

  directMentionHandler (bot, message) {
    dispatch(messageActions.receivedMessage(message))
    if (message.text === '' || message.text === ':') {
      bot.reply(message, 'Well, try `@ryszard hello` to get some help <@' + message.user + '>')
    }
  }

  startGameHandler (bot, message) {
    var id = GameService.createId(message.ts)

    if (GameService.getStatus() === 'idle') {
      dispatch(gamesActions.createGame(id, message.channel, message.user, message.ts))
        .then((response) => {
          let playersToNotify = _.map(GameService.getPendingPlayers(id), (player) => {
            return '<@' + player + '>'
          }).join(', ')
          bot.reply(message, `${playersToNotify} do you wanna play?`)
          // console.log(GameService.getAvailablePlayers(id))
        })
    } else {
      bot.reply(message, 'Sorry, there is a game going on now...')
    }
  }

  confirmGameHandler (bot, message) {
    let game = GameService.getCurrentGame()

    // if (GameService.getStatus() === 'idle') {
    //   bot.reply(message, 'Sorry, there is no game going on now. You can always start a new one!')
    //   return false
    // }
    //
    // if (game.meta.organizer === message.user) {
    //   bot.reply(message, 'Sorry, you are the organizer, you have already accepted...')
    //   return false
    // }

    if (GameService.getStatus() === 'pending') {
      dispatch(gamesActions.playerAccepted(GameService.getCurrentGameId(), message.user))
      console.log(message.user, ' joined')
    } else {
      bot.reply(message, 'Sorry, there is a game going on')
    }
    return this.gameStatusHandler(message)
  }

  rejectGameHandler (bot, message) {
    let game = GameService.getCurrentGame()
    let gameId = GameService.getCurrentGameId()

    if (GameService.getStatus() === 'idle') {
      bot.reply(message, 'Aaaaaaa, w00t?! `@ryszard help`')
      return false
    }

    if (game.meta.organizer === message.user) {
      bot.reply(message, 'You are the organizer, you can only cancel a game: `@ryszard fuck it`')
      return false
    }

    if (GameService.getStatus() === 'pending' && GameService.countAvailablePLayers(gameId) > 0) {
      dispatch(gamesActions.playerRejected(gameId, message.user))
        .then(() => {
          let newPlayer = _.last(GameService.getPendingPlayers(gameId))
          bot.reply(message, `<@${message.user}> rejected.\n*<@${newPlayer}> what about you?*`)
        })
      return false
    } else {
      bot.reply(message, `<@${message.user}> was the last one available. Try later!`)
      dispatch(statusActions.updateStatus({
        gameId: -1,
        status: 'idle'
      }))
    }
  }

  cancelGameHandler (bot, message) {
    bot.reply(message, 'All right, maybe next time..., ')
    dispatch(statusActions.updateStatus({
      gameId: -1,
      status: 'idle'
    }))
  }

  gameStatusHandler (message) {
    let players = GameService.getPlayers(GameService.getCurrentGameId())

    if (players.accepted.length === 4) {
      let playersString = this.getPlayersString(players.accepted)
      Services.SlackBot.bot.reply(message, playersString + ' let\'s play!')
    } else {
      console.log(`Waiting for  ${players.pending.length} players ...`)
    }
  }

  getPlayersString (players) {
    return _.map(players, (player) => {
      return '<@' + player + '>'
    }).concat(', ')
  }
}

export default RBot
