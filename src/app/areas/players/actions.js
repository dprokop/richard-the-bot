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
export const REGISTER_PLAYERS = 'REGISTER_PLAYERS'

/* =====  End of Action types  ======*/

/*=======================================
=            Action creators            =
=======================================*/

/** @module players/actions */

/**
 * @todo Implement action creators for this area
 *
 * [Action name] action creator
 * @param {[type]} payload [description]
 * @return {@link REGISTER_PLAYERS} action object
 */
export function getPlayers (payload) {
  return {
    type: REGISTER_PLAYERS,
    payload
  }
}

/* =====  End of Action creators  ======*/
