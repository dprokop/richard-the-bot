var RBotConfig = new Map()

RBotConfig.set('START_GAME', {
  phrases: ['let\'s', 'do it', 'zagrajmy', 'it\'s', 'time', '!', 'gramy'],
  triggers: ['direct_mention', 'mention']
})

RBotConfig.set('CONFIRM_GAME', {
  phrases: ['^ok$', '^yes$'],
  triggers: ['direct_mention', 'mention']
})

RBotConfig.set('REJECT_GAME', {
  phrases: ['^no$', '^spierdalaj$'],
  triggers: ['direct_mention', 'mention']
})

RBotConfig.set('CANCEL_GAME', {
  phrases: ['^fuck it$', '^cancel$'],
  triggers: ['direct_mention', 'mention']
})

RBotConfig.set('GET_STATUS', {
  phrases: ['^status$', '^what\'s up$'],
  triggers: ['direct_mention', 'mention']
})

RBotConfig.set('GET_HELP', {
  phrases: ['^help$', '^hello$'],
  triggers: ['direct_mention', 'mention']
})

RBotConfig.set('PING', {
  phrases: ['^ping$'],
  triggers: ['direct_mention', 'mention']
})

RBotConfig.set('CONSOLE_LOG', {
  phrases: ['^whip it$'],
  triggers: ['direct_mention', 'mention']
})

export default RBotConfig
