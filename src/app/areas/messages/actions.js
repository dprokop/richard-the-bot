'use strict'

/*=======================================
=              Action types             =
=======================================*/
/**
 * @todo Define action types for this area
 *
 * [Action name] action type
 * @constant
 * @type {[type]}
 */
export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE'

/* =====  End of Action types  ======*/

/*=======================================
=            Action creators            =
=======================================*/

/** @module messages/actions */

/**
 * @todo Implement action creators for this area
 *
 * [Action name] action creator
 * @param {[type]} payload [description]
 * @return {@link RECEIVED_MESSAGE} action object
 */
export function receivedMessage (payload) {
  return {
    type: RECEIVED_MESSAGE,
    payload
  }
}

/* =====  End of Action creators  ====== */
