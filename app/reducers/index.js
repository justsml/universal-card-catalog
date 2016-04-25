import { combineReducers } from 'redux'
import userReducer         from './UserReducer'
import gameReducer         from './GameReducer'
import { GameActions, UserActions } from '../actions'
// const { SELECT_GAME, INVALID_GAMES, REQUEST_GAMES, RECEIVE_GAMES } = GameActions
// const { LOGIN, REGISTER } = UserActions
const { RECEIVE_GAMES, REQUEST_GAMES, REQUEST_ERROR, INVALID_GAMES, SELECT_GAME } = GameActions.LABELS
const { LOGIN, REGISTER, LOGOUT_USER } = UserActions.LABELS

const rootReducer = combineReducers({
  games: gameReducer,
  user: userReducer
})

export default rootReducer
