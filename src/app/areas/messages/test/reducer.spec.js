/* global describe, beforeEach, it, expect */

var messages = require('../reducer').messages
var assert = require('assert')
var deepFreeze = require('deep-freeze')

describe('Messages reducer', function () {
  it('adds new message to the state', function () {
    var stateBefore = []
    var stateAfter = [
      {
        message: 'Message'
      }
    ]
    var stateAfter1 = [
      {
        message: 'Message'
      },
      {
        message: 'Message'
      }
    ]
    var action = {
      type: 'RECEIVED_MESSAGE',
      payload: {
        message: 'Message'
      }
    }

    deepFreeze(stateBefore)

    var result1 = messages(stateBefore, action)
    deepFreeze(stateAfter)
    var result2 = messages(stateAfter, action)

    assert.deepEqual(result1, stateAfter)
    assert.deepEqual(result2, stateAfter1)
  })
})
