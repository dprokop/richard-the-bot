/*global describe, beforeEach, it, expect*/

'use strict'

import deepFreeze from 'deep-freeze'

import { <%= areaName %> } from '../reducer'

describe('<%= (areaName[0].toUpperCase() + areaName.slice(1)) %> reducer', function () {

    beforeEach(function () {

    })

    it('should perform particular action', function (){

        /**
         * @todo define state before and state after for comparison
         */
        var stateBefore = []
        var stateAfter = ['State after']

        deepFreeze(stateBefore)

        /**
         * @todo Update payload to fit your model
         */
        var action = {
            type: 'ACTION_NAME',
            payload: {}
        }
        var result = <%= areaName %>(stateBefore, action)

        expect(result).toEqual(stateAfter)
    })


})