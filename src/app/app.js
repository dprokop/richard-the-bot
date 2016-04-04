import AppSettings from './config/app_settings'
import setupStore from './config/store'
import RBot from './components/bot'
import { bootServices } from './common/services'

/** Class representing app */
class App {

  /**
   * Initialize application
   * @param  {Object} initialState - initial state passed to the app
   */
  constructor (initialState) {
    this.store = setupStore({})
    this.configureServices(AppSettings).then(() => {
      console.log('Services booted, starting Ryszard')
      this.bot = new RBot()
    })
  }

  /**
   * Initialize services with provided configuration
   */
  configureServices () {
    console.log('Booting up services')
    return bootServices(AppSettings.services)
  }
}

var app = new App()

export function getStore () {
  return app.store
}

export function getState () {
  return app.store.getState()
}

export function dispatch (action) {
  return app.store.dispatch(action)
}

export default app
