import { combineReducers } from 'redux'
import {
  SELECT_GAME, INVALIDATE_GAMES,
  REQUEST_GAMES, RECEIVE_GAMES
} from '../actions'

function selectedGame(state = {}, action) {
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
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_GAMES:
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
  switch (action.type) {
    case INVALIDATE_GAMES:
    case RECEIVE_GAMES:
    case REQUEST_GAMES:
      return Object.assign({}, state, setGames(state, action))
    default:
      return state
  }
}

const rootReducer = combineReducers({
  gamesByUser,
  selectedGame
})

export default rootReducer
