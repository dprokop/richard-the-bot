import Services from '../../common/services'
import {
    getStore,
    getState,
    dispatch
} from '../../app'
import * as messageActions from '../../areas/messages/actions'
import * as playersActions from '../../areas/players/actions'
import * as gamesActions from '../../areas/games/actions'
import * as statusActions from '../../areas/status/actions'
import _ from 'underscore'

var GameService = Services.Game

function directMentionHandler (bot, msg) {
  dispatch(messageActions.receivedMessage(msg))
  Services.SlackBot.getContext(msg.channel)

  if (msg.text === '' || msg.text === ':') {
    bot.reply(msg, 'Well, try `@ryszard hello` to get some help <@' + msg.user + '>')
  }
}

function startGameHandler (bot, msg) {
  let id = GameService.createId()
  if (GameService.getStatus() === 'idle') {
    dispatch(gamesActions.createGame(id, msg.channel, msg.user, Date.now()))
            .then((response) => {
              let playersToNotify = getPlayersString(GameService.getPendingPlayers(id))
              bot.reply(msg, `${playersToNotify} do you wanna play?`)
            })
  } else if (GameService.getStatus() === 'pending') {
    bot.reply(msg, '_There is a game I\'m organizing right now. Come back later :)_')
  } else {
    bot.reply(msg, `_Sorry, there is a game going on right now... It will take ~${GameService.getCurrentGameElapsedTime()}min _`) // eslint-disable max-len`
  }
}

function confirmGameHandler (bot, msg) {
  let game = GameService.getCurrentGame()
  let reply = 'Cool, great you have joined!'

  if (GameService.isIdle()) {
    bot.reply(msg, '_No game going on right now! You can always start a new one!_')
    return

  }
  if (GameService.isOrganizedBy(msg.user)) {
    reply = '_Sorry, you are the organizer, you have already accepted..._'
    bot.reply(msg, reply)
    return false
  }

  if (GameService.hasUserAccepted(msg.user)) {
    bot.reply(msg, '_You have already joined this game_')
    return false
  }

  if (!GameService.isUserInvited(msg.user)) {
    bot.reply(msg, '_Sorry, you are not invited to this game_')
    return false
  }



  if (GameService.isPending()) {
    dispatch(gamesActions.playerAccepted(GameService.getCurrentGameId(), msg.user))
  }

  bot.reply(msg, reply)

  return this.gameStatusHandler(msg)
}

function rejectGameHandler (bot, msg) {
  let game = GameService.getCurrentGame()
  let gameId = GameService.getCurrentGameId()
  let reply = ''

  if (typeof game === 'undefined') {
    bot.reply(msg, '_Say what? No to what?!_')
    return
  }

  if (GameService.getStatus() === 'idle') {
    bot.reply('_Aaaaaaa, w00t?! `@ryszard help`_')
    return
  }
  if (GameService.getCurrentGameOrganizer() === msg.user) {
    bot.reply(msg, '_You are the organizer, you can only cancel a game:_ `@ryszard fuck it`')
    return
  }

  if (GameService.getStatus() === 'pending' && GameService.countAvailablePlayers(gameId) > 0) {
    dispatch(gamesActions.playerRejected(gameId, msg.user))
            .then(() => {
                bot.reply(msg, `<@${msg.user}> rejected.\n*<@${GameService.getRecentlyAddedPlayer(gameId)}> what about you?*`) // eslint-disable-line
            })
    return
  } else {
    reply = `<@${msg.user}> was the last one available. Try again later!`
    dispatch(statusActions.updateStatus({
      gameId: 1,
      status: 'idle'
    }))
  }

  bot.reply(msg, reply)
}

function cancelGameHandler (bot, message) {
  bot.reply(message, '_All right, maybe next time..._')
  dispatch(statusActions.updateStatus({
    gameId: -1,
    status: 'idle'
  }))
}

function getStatusHandler (bot, msg) {
  let reply

  if (GameService.getStatus() === 'idle') {
        bot.reply(msg, '_There is no game going on now. You can start one:) Need some help?_ `@ryszard help`') // eslint-disable-line
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
        'text': `Pending players: ${getPlayersString(players.pending)}`
      })
    }

    if (players.accepted.length > 0) {
      reply.attachments.push({
        'color': '#00ff00',
        'text': `Accepted players: ${getPlayersString(players.accepted)}`
      })
    }

    if (players.rejected.length > 0) {
      reply.attachments.push({
        'color': '#ff0000',
        'text': `Rejected players: ${getPlayersString(players.rejected)}`
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
      'text': `Accepted players: ${getPlayersString(players)}`
    })

    reply.attachments.push({
      'color': '#0000ff',
      'text': `Elapsed time: ~${Math.ceil(GameService.getCurrentGameTime() / 60)} min`
    })
  }
  bot.reply(msg, reply)
}

function periodicEventsHandler () {
  if (GameService.getStatus() === 'occupied' && GameService.getCurrentGameTime() > 15 * 60) {
    dispatch(statusActions.updateStatus({
      gameId: -1,
      status: 'idle'
    }))
    console.log('All right, its time for a new game...')
  }
}

function gameStatusHandler (message) {
  let players = GameService.getCurrentGamePlayers()
  console.log(typeof players)
  if (typeof players === 'undefined') {
    return false
  }

  if (players.accepted.length === 4) {
    let playersString = getPlayersString(players.accepted)
    Services.SlackBot.bot.reply(message, playersString + ' let\'s play!')

    dispatch(gamesActions.startGame(GameService.getCurrentGameId(), Date.now()))
    dispatch(statusActions.updateStatus({
      gameId: GameService.getCurrentGameId(),
      status: 'occupied'
    }))

    return true
  } else {
    console.log(`Waiting for  ${players.pending.length} players ...`)
    return false
  }
}

function pingHandler (bot, message) {
  if (GameService.getStatus() === 'pending') {
    let reply = 'One shall answer when asked '
    reply += `${getPlayersString(GameService.getCurrentGamePlayers().pending)}!`
    bot.reply(message, reply)
  } else {
    bot.reply(message, 'Pong b*tch, there is no one I could ping...')
  }
}

function getHelpHandler (bot, message) {
    /* eslint-disable max-len */
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
        /* eslint-enable max-len */
  bot.reply(message, reply)
}

function consoleLogHandler (bot, message) {
  console.log(getState())
  bot.reply(message, 'Roger!')
}

function getPlayersString (players) {
  var playersString = _.map(players, (player) => {
    return '<@' + player + '>'
  }).join(', ')
  return playersString
}

export default {
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
}
