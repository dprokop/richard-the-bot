import Services from '../../common/services'
import Ticker from '../ticker'
import { getStore, getState, dispatch } from '../../app'
import * as messageActions from '../../areas/messages/actions'
import * as playersActions from '../../areas/players/actions'
import * as gamesActions from '../../areas/games/actions'
import * as statusActions from '../../areas/status/actions'
import KeywordsConfig from './config.js'
import CommandHandlers from './command-handlers.js'
import _ from 'underscore'

var GameService = Services.Game

class RBot {
  constructor () {
    this.gameStatusTicker = Ticker.every(5000).do(CommandHandlers.periodicEventsHandler)

    this.initializeListeners()
  }

  initializeListeners () {
    Services.SlackBot.controller.on('direct_mention', CommandHandlers.directMentionHandler)

    KeywordsConfig.forEach((v, k) => {
      var handlerName = this.getHandlerName(k)
      console.log(CommandHandlers[handlerName])
      Services.SlackBot.controller.hears(v.phrases, v.triggers, CommandHandlers[handlerName])
    })
  }

  getHandlerName (capitalizedKeyword) {
    var keyword = capitalizedKeyword.toLowerCase().split('_')

    return (_.first(keyword).concat(_.map(_.rest(keyword), (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }))).concat('Handler')
  }
}

export default RBot

