import Services from '../../common/services'
import Ticker from '../ticker'
import { getStore, getState, dispatch } from '../../app'
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
    this.startGameHandler = this.startGameHandler.bind(this)
    this.confirmGameHandler = this.confirmGameHandler.bind(this)
    this.rejectGameHandler = this.rejectGameHandler.bind(this)
    this.getStatusHandler = this.getStatusHandler.bind(this)
    this.pingHandler = this.pingHandler.bind(this)

    this.initializeListeners()

    this.gameStatusTicker = Ticker.every(5000).do(() => {
      if (GameService.getStatus() === 'occupied' && GameService.getCurrentGameTime() > 15 * 60) {
        dispatch(statusActions.updateStatus({
          gameId: -1,
          status: 'idle'
        }))
        console.log('All right, its time for a new game...')
      }
    })
  }

  initializeListeners () {
    Services.SlackBot.controller.on('direct_mention', this.directMentionHandler)
    Services.SlackBot.controller.on('bot_added', this.initializeData)
    Services.SlackBot.controller.on('bot_changed', this.initializeData)

    KeywordsConfig.forEach((v, k) => {
      var handlerName = this.getHandlerName(k)
      console.log(handlerName)
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
    var id = GameService.createId()

    if (GameService.getStatus() === 'idle') {
      dispatch(gamesActions.createGame(id, message.channel, message.user, Date.now()))
        .then((response) => {
          let playersToNotify = this.getPlayersString(GameService.getPendingPlayers(id))
          bot.reply(message, `${playersToNotify} do you wanna play?`)
        })
    } else {
      bot.reply(message, 'Sorry, there is a game going on right now...')
    }
  }

  confirmGameHandler (bot, message) {
    let game = GameService.getCurrentGame()

    if (GameService.getStatus() === 'idle') {
      bot.reply(message, 'Sorry, there is no game going on now. You can always start a new one!')
      return false
    }

    if (GameService.getCurrentGameOrganizer() === message.user) {
      bot.reply(message, 'Sorry, you are the organizer, you have already accepted...')
      return false
    }

    if (GameService.getStatus() === 'pending') {
      dispatch(gamesActions.playerAccepted(GameService.getCurrentGameId(), message.user))
    } else {
      bot.reply(message, 'Sorry, there is a game going on')
    }

    return this.gameStatusHandler(message)
  }

  rejectGameHandler (bot, message) {
    let game = GameService.getCurrentGame()
    let gameId = GameService.getCurrentGameId()

    console.log(GameService.getAvailablePlayers(gameId))
    // if (GameService.getStatus() === 'idle') {
    //   bot.reply(message, 'Aaaaaaa, w00t?! `@ryszard help`')
    //   return false
    // }
    //
    // if (game.meta.organizer === message.user) {
    //   bot.reply(message, 'You are the organizer, you can only cancel a game: `@ryszard fuck it`')
    //   return false
    // }

    if (GameService.getStatus() === 'pending' && GameService.countAvailablePlayers(gameId) > 0) {
      dispatch(gamesActions.playerRejected(gameId, message.user))
        .then(() => {
          bot.reply(message, `<@${message.user}> rejected.\n*<@${GameService.getRecentlyAddedPlayer(gameId)}> what about you?*`)
        })
      return false
    } else {
      bot.reply(message, `<@${message.user}> was the last one available. Try again later!`)
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

  getStatusHandler (bot, message) {
    let reply
    if (GameService.getStatus() === 'idle') {
      reply = 'There is no game going on now. You can start one:)'
      return
    }
    if (GameService.getStatus() === 'pending') {
      let organizer = GameService.getOrganizer(GameService.getCurrentGameId())
      let players = GameService.getPlayers(GameService.getCurrentGameId())

      reply = {
        'text': `*There is a pending game requested by <@${organizer}>*`,
        'attachments': []
      }
      if (players.pending.length > 0) {
        reply.attachments.push({
          'color': '#0000ff',
          'text': `Pending players: ${this.getPlayersString(players.pending)}`
        })
      }

      if (players.accepted.length > 0) {
        reply.attachments.push({
          'color': '#00ff00',
          'text': `Accepted players: ${this.getPlayersString(players.accepted)}`
        })
      }

      if (players.rejected.length > 0) {
        reply.attachments.push({
          'color': '#ff0000',
          'text': `Rejected players: ${this.getPlayersString(players.rejected)}`
        })
      }
    }
    if (GameService.getStatus() === 'occupied') {
      let organizer = GameService.getOrganizer(GameService.getCurrentGameId())
      let players = GameService.getAcceptedPlayers(GameService.getCurrentGameId())
      reply = {
        'text': `*There is a game going on requested by <@${organizer}>*`,
        'attachments': []
      }

      reply.attachments.push({
        'color': '#00ff00',
        'text': `Accepted players: ${this.getPlayersString(players)}`
      })

      reply.attachments.push({
        'color': '#0000ff',
        'text': `Elapsed time: ~${Math.ceil(GameService.getCurrentGameTime() / 60)} min`
      })
    }
    Services.SlackBot.bot.reply(message, reply)

  }

  gameStatusHandler (message) {
    let players = GameService.getPlayers(GameService.getCurrentGameId())

    if (players.accepted.length === 4) {
      let playersString = this.getPlayersString(players.accepted)
      Services.SlackBot.bot.reply(message, playersString + ' let\'s play!')

      dispatch(gamesActions.startGame({
        gameId: GameService.getCurrentGameId(),
        startedAt: Date.now()
      }))
      dispatch(statusActions.updateStatus({
        gameId: GameService.getCurrentGameId(),
        status: 'occupied'
      }))
    } else {
      dispatch(gamesActions.startGame(GameService.getCurrentGameId(), Date.now()))
      dispatch(statusActions.updateStatus({
        gameId: GameService.getCurrentGameId(),
        status: 'occupied'
      }))
      console.log(`Waiting for  ${players.pending.length} players ...`)
    }
  }

  pingHandler (bot, message) {
    if (GameService.getStatus() === 'pending') {
      let reply = 'One shall answer when asked '
      reply += `${this.getPlayersString(GameService.getCurrentGamePlayers().pending)}!`
      bot.reply(message, reply)
    } else {
      bot.reply(message, 'Pong b*tch, there is no one I could ping...')
    }
  }

  getHelpHandler (bot, message) {
    var reply = "_Hi, I\'m *Ryszard* and I will organize a foosball team for you :heart:_ \n\n"
    reply += '_Let me introduce you to the language I speak:_\n'
    reply += '=====================:heart::soccer::heart:=====================\n'
    reply += "`@ryszard let's do it`, `@ryszard it's time` `@ryszard gramy` - _that's how you tell me that you are looking for a team. I'll as random 3 ppl if they want to play_\n"
    reply += '`@ryszard ok` _if you are willing to play_\n'
    reply += "`@ryszard no` _if you don't want to play. I'll try to ask another person if she accepts the challange_\n"
    reply += '`@ryszard cancel` _if you want to cancel your game_\n'
    reply += '`@ryszard help`, `@ryszard hello` _if you need some help on how to talk with me_\n'
    reply += '`@ryszard status` _if you need to know some details about current game being planned_ \n'
    reply += '=====================:heart::soccer::heart:=====================\n'

    bot.reply(message, reply)
  }

  consoleLogHandler (bot, message) {
    console.log(getState())
    bot.reply(message, 'Roger!')
  }

  getPlayersString (players) {
    console.log(players)
    var playersString = _.map(players, (player) => {
      return '<@' + player + '>'
    }).join(', ')
    return playersString
  }

  getHandlerName (capitalizedKeyword) {
    var keyword = capitalizedKeyword.toLowerCase().split('_')

    return (_.first(keyword).concat(_.map(_.rest(keyword), (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }))).concat('Handler')
  }
}

export default RBot
