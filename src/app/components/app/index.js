import appDev from './app.dev'
import appProd from './app.prod'

if (process.env.NODE_ENV === 'development') {
  module.exports = appDev
}

if (process.env.NODE_ENV === 'production') {
  module.exports = appProd
}
