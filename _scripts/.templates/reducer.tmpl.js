/** @module <%= areaName %>/reducer */

'use strict'

import * as <%= areaName %>Actions from './actions'

/**
 * @todo Update state type and default value to reflect your model
 * @todo Implement reducer
 *
 * <%= (areaName[0].toUpperCase() + areaName.slice(1)) %> reducer
 * @param  {[type]}  state  - current state to be reduced
 * @param  {Object} action - action to be performed on current state
 * @param  {string} action.type - {@link ACTION_NAME|ACTION_NAME}, ...
 * @return {[type]} - array representing new state
 */
export function <%= areaName %> (state = [], action) {
    switch (action.type) {
    case <%= areaName %>Actions.ACTION_NAME:
        return [...state, action.payload]
        break
    default:
        return state
    }
}