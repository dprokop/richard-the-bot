export default {
  paths: {
    images: 'static/images',
    fonts: 'static/fonts'
  },
  services: {
    SlackBot: {
      token: 'xoxb-28855753061-SAYBLxuWVqEE1Ibrk0N04ne2',
      enabled: true
    },
    Mongo: {
      url: 'mongodb://localhost:27017/',
      dbName: 'ryszard-dev',
      enabled: false
    }
  }
}
