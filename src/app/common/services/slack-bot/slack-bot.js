import Botkit from 'botkit'
import { getStore as store } from '../../../app'
import { receivedMessage } from '../../../areas/messages/actions'

class SlackBot {
  boot (config) {
    return new Promise((resolve, reject) => {
      this.controller = Botkit.slackbot({
        debug: false
      })

      this.controller.spawn({
        token: config.token
      }).startRTM((err, response) => {
        if (err) {
          throw new Error(err)
        }
        this.registerBot(response)
        resolve(response)
      })
    })
  }

  registerBot (bot) {
    this.bot = bot
    this.id = bot.identity.id
  }
}

export default SlackBot
