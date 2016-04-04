/** @module messages/reducer */

'use strict'

import * as messagesActions from './actions'

/**
 * @todo Update state type and default value to reflect your model
 * @todo Implement reducer
 *
 * Messages reducer
 * @param  {[type]}  state  - current state to be reduced
 * @param  {Object} action - action to be performed on current state
 * @paraxm  {string} action.type - {@link ACTION_NAME|ACTION_NAME}, ...
 * @return {[type]} - array representing new state
 */

export function messages (state = [], action) {
  switch (action.type) {
    case messagesActions.RECEIVED_MESSAGE: {
      return [...state, action.payload]
    }
    default:
      return state
  }
}
