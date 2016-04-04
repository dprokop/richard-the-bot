import storeDev from './configStore.dev'
import storeProd from './configStore.prod'

if (process.env.NODE_ENV === 'development') {
  module.exports = storeDev
}

if (process.env.NODE_ENV === 'production') {
  module.exports = storeProd
}
