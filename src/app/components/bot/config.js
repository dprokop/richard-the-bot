var RBotConfig = new Map()

RBotConfig.set('START_GAME', {
  phrases: ['let\'s', 'do it', 'grać!', 'zagrajmy', 'play', 'it\'s', 'time', '!', 'gramy'],
  triggers: ['direct_mention', 'mention']
})

RBotConfig.set('CONFIRM_GAME', {
  phrases: ['^ok$'],
  triggers: ['direct_mention', 'mention']
})

RBotConfig.set('REJECT_GAME', {
  phrases: ['^no$'],
  triggers: ['direct_mention', 'mention']
})

RBotConfig.set('CANCEL_GAME', {
  phrases: ['^fuck it$'],
  triggers: ['direct_mention', 'mention']
})

RBotConfig.set('GET_STATUS', {
  phrases: ['^status$'],
  triggers: ['direct_mention', 'mention']
})

export default RBotConfig
