/** @module status/reducer */

'use strict'

import * as statusActions from './actions'

/**
 * @todo Update state type and default value to reflect your model
 * @todo Implement reducer
 *
 * Status reducer
 * @param  {[type]}  state  - current state to be reduced
 * @param  {Object} action - action to be performed on current state
 * @param  {string} action.type - {@link UPDATE_STATUS|UPDATE_STATUS}, ...
 * @return {[type]} - array representing new state
 */
export function status (state = { status: 'idle' }, action) {
  switch (action.type) {
    case statusActions.UPDATE_STATUS:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
