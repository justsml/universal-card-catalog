import { GameActions } from '../actions'
const { RECEIVE_GAMES, REQUEST_GAMES, REQUEST_ERROR, INVALID_GAMES, SELECT_GAME } = GameActions.LABELS

export default gameReducer;


function selectedGame(state = {}, action) {
  console.warn('selectedGame', state, action)
  switch (action.type) {
    case SELECT_GAME:
      return Object.assign({}, state, {'selected': action.game})
    default:
      return state
  }
}

function gameReducer(state = {
  isFetching: false,
  didInvalidate: false,
  results: []
}, action) {
  console.warn('gameReducer', state, action)
  switch (action.type) {
    case INVALID_GAMES:
      return Object.assign({}, state, {
        'isFetching': false,
        'didInvalidate': true
      })
    case REQUEST_ERROR:
      return Object.assign({}, state, {
        'isFetching': false,
        'error': action.error
      })
    case REQUEST_GAMES:
      return Object.assign({}, state, {
        'isFetching': true,
        'didInvalidate': false
      })
    case RECEIVE_GAMES:
      return Object.assign({}, state, {
        'isFetching': false,
        'didInvalidate': false,
        'results': action.results,
        'lastUpdated': action.lastUpdated
      })
    case SELECT_GAME:
      return Object.assign({}, state, selectedGame(state, action))
    default:
      return state
  }
}

// function (state = { }, action) {
//   console.warn('gameReducer', state, action)
//   switch (action.type) {
//     case INVALID_GAMES:
//     case RECEIVE_GAMES:
//     case REQUEST_GAMES:
//       return Object.assign({}, state, setGames(state, action))
//     default:
//       return state
//   }
// }

