import Botkit from 'botkit'
import { getStore as store } from '../../../app'
import { receivedMessage } from '../../../areas/messages/actions'
import fs from 'fs'
import _ from 'underscore'
import stringify from 'json-stringify-safe'

class SlackBot {
  boot (config) {
    return new Promise((resolve, reject) => {
      this.controller = Botkit.slackbot({
        debug: false
      })

      this.controller.spawn({
        token: config.token
      }).startRTM((err, bot, slackResponse) => {
        if (err) {
          throw new Error(err)
        }
        this.cacheTeamData(slackResponse)
        this.registerBot(bot)
        resolve(slackResponse)
      })
    })
  }

  cacheTeamData (data) {
    this.team = {
      users: data.users,
      channels: _.map(data.channels, (channel) => { return channel.id }),
      groups: _.map(data.groups, (group) => { return group.id })
    }
  }

  registerBot (bot) {

    fs.writeFile('bot.json', stringify(this.team.groups), function (err) {
      if (err) {
        return console.log(err)
      }

      console.log('The file was saved!')
    })
    this.bot = bot
    this.id = bot.identity.id
  }

  isGroup (id) {
    return _.indexOf(this.team.groups, id) > -1
  }

  isChannel (id) {
    return _.indexOf(this.team.channels, id) > -1
  }

  getContext (id) {
    var ctx = {}

    if (this.isGroup(id)) {
      ctx = {
        ctx: this.bot.api.groups,
        name: 'group'
      }
    } else {
      ctx = {
        ctx: this.bot.api.channels,
        name: 'channel'
      }
    }

    return ctx
  }
}

export default SlackBot
