import shortid from 'shortid'

class Ticker {
  constructor () {
    this.tickers = {}

    this.createCallback = this.createCallback.bind(this)
    this.do = this.do.bind(this)
    this.remove = this.remove.bind(this)
  }

  every (tick) {
    return this.createCallback(shortid.generate(), tick)
  }

  createCallback (id, interval) {
    return {
      do: (callback) => {
        this.do(id, interval, callback)
        return id
      }
    }
  }

  do (id, interval, callback) {
    if (this.tickers[id] === undefined) {
      console.log('Setting ticker ', id)
      this.tickers[id] = setInterval(callback, interval)
      console.log('Returning ', id)
      return id
    } else {
      console.log('Ticker is defined')
    }

    throw new TypeError('Ticker of this id is already defined')
  }

  remove (id) {
    console.log('Removing ticker ', id)
    if (this.tickers[id] !== undefined) {
      clearInterval(this.tickers[id])
      delete this.tickers[id]
      return true
    }
    throw new TypeError('Ticker is not defined')
  }
}

var ticker = new Ticker()

export default ticker
