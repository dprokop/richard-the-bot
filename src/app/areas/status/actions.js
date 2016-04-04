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
export const UPDATE_STATUS = 'UPDATE_STATUS'

/* =====  End of Action types  ======*/

/*=======================================
=            Action creators            =
=======================================*/

/** @module status/actions */

/**
 * @todo Implement action creators for this area
 *
 * [Action name] action creator
 * @param {[type]} payload [description]
 * @return {@link UPDATE_STATUS} action object
 */
export function updateStatus (payload) {
  console.log('Updating status')
  return {
    type: UPDATE_STATUS,
    payload
  }
}

/* =====  End of Action creators  ======*/
