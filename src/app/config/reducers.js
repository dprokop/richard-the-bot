import { combineReducers } from 'redux'
import { messages as messagesReducer } from '../areas/messages/reducer'
import { games as gamesReducer } from '../areas/games/reducer'
import { status as statusReducer } from '../areas/status/reducer'

export default combineReducers({
  messages: messagesReducer,
  games: gamesReducer,
  status: statusReducer
})
