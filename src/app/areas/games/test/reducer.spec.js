/* global describe, beforeEach, it, expect*/

import deepFreeze from 'deep-freeze'

import { games } from '../reducer'

describe('Games reducer', function () {
  beforeEach(function () {

  })

  it('creates new game onject', function () {
  /**
   * @todo define state before and state after for comparison
   */
    var stateBefore = []
    var stateAfter = {}
    var timestamp = Date.now()

    stateAfter[timestamp] = Object.create({
      meta: {
        chanel: 1,
        organizer: 'Dominik',
        createdAt: timestamp
      },
      players: {
        available: [],
        pending: [],
        accepted: [],
        rejected: []
      }
    })
    deepFreeze(stateBefore)

        /**
         * @todo Update payload to fit your model
         */
    var action = {
      type: 'ADD_GAME',
      payload: {
        channel: 1,
        organizer: 'Dominik',
        createdAt: timestamp
      }
    }
    var result = games(stateBefore, action)
    console.log(stateAfter)

    // expect(result).toEqual(stateAfter)
  })
})
