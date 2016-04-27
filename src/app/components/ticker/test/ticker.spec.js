/* global describe, beforeEach, it, expect*/

var deepFreeze = require('deep-freeze')
import Ticker from '../ticker'
var assert = require('assert')
var expect = require('expect.js')

describe('Ticker', () => {
  var ticker, id
  beforeEach(() => {
    ticker = new Ticker()
  })

  it('creates callback creation API for a given interval', () => {
    var result = ticker.every(1000)

    expect(result).not.to.be(undefined)
    expect(Object.keys(result).length).to.be(2)
    expect(result.id).to.be.a('string')
    expect(result.do).to.be.a('function')
  })

  it('registers callback for a given interval', () => {
    var callback = () => { return 'abs' }
    var result = ticker.do('abc', 10, callback)

    expect(result).to.be('abc')
    console.log(ticker.tickers['abc']);
    // expect(ticker.tickers['abc']).to.be(callback)
  })
})
