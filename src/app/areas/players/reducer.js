/** @module players/reducer */

'use strict'

import * as playersActions from './actions'

/**
 * @todo Update state type and default value to reflect your model
 * @todo Implement reducer
 *
 * Players reducer
 * @param  {[type]}  state  - current state to be reduced
 * @param  {Object} action - action to be performed on current state
 * @param  {string} action.type - {@link ACTION_NAME|ACTION_NAME}, ...
 * @return {[type]} - array representing new state
 */
export function players (state = [], action) {
  switch (action.type) {
    case playersActions.ACTION_NAME:
      return [...state, action.payload]
    default:
      return state
  }
}
