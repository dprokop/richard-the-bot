import AppSettings from './config/app_settings'
import setupStore from './config/store'
import RBot from './components/bot'
import { bootServices } from './common/services'
import express from 'express'
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')

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

    this.configureExpressEndpoints()
  }

  /**
   * Initialize services with provided configuration
   */
  configureServices () {
    console.log('Booting up services')
    return bootServices(AppSettings.services)
  }

  configureExpressEndpoints () {
    this.express = express()
    this.express.get('/', function (req, res) {
      res.send('hello world')
    })
    this.express.listen(process.env.PORT)
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
