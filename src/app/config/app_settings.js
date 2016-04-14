export default {
  paths: {
    images: 'static/images',
    fonts: 'static/fonts'
  },
  services: {
    SlackBot: {
      token: process.env.RBOT_SLACK_TOKEN,
      enabled: true
    },
    Mongo: {
      url: 'mongodb://localhost:27017/',
      dbName: 'ryszard-dev',
      enabled: false
    }
  }
}
