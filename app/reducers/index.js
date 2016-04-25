import { combineReducers } from 'redux'
import userReducer         from './UserReducer'
import { GameActions, UserActions } from '../actions'
const { SELECT_GAME, INVALID_GAMES, REQUEST_GAMES, RECEIVE_GAMES } = GameActions
const { LOGIN, REGISTER } = UserActions

function selectedGame(state = {}, action) {
  console.warn('selectedGame', state, action)
  switch (action.type) {
    case SELECT_GAME:
      return action.game
    default:
      return state
  }
}

function setGames(state = {
  isFetching: false,
  didInvalidate: false,
  games: []
}, action) {
  console.warn('setGames', state, action)
  switch (action.type) {
    case INVALID_GAMES:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_GAMES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_GAMES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        games: action.games,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function gamesByUser(state = { }, action) {
  console.warn('gamesByUser', state, action)
  switch (action.type) {
    case INVALID_GAMES:
    case RECEIVE_GAMES:
    case REQUEST_GAMES:
      return Object.assign({}, state, setGames(state, action))
    default:
      return state
  }
}

const rootReducer = combineReducers({
  myGames: gamesByUser,
  selectedGame: selectedGame,
  user: userReducer
})

export default rootReducer
