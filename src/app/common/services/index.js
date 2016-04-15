import SlackBotService from './slack-bot'
import DBService from './db-service'

let Services = {
  SlackBot: new SlackBotService(),
  Mongo: new DBService()
}

export default Services

export function bootServices (config) {
  var promises = []
  Object.keys(config).forEach((key) => {
    if (config[key].enabled) {
      if (Services[key] && Services[key].boot !== 'undefined ') {
        console.log(`\tBooting up ${key} service`)
        try {
          promises.push(Services[key].boot(config[key]))
        } catch (e) {
          console.log(e)
        }
      } else {
        throw new Error(`${key} service is not defined`)
      }
    }
  })

  return Promise.all(promises)
}
