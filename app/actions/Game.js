import {fetcher} from '../utils'
const Game = {
  LABELS: {
    'RECEIVE_GAMES': 'RECEIVE_GAMES',
    'REQUEST_GAMES': 'REQUEST_GAMES',
    'REQUEST_ERROR': 'REQUEST_ERROR',
    'INVALID_GAMES': 'INVALID_GAMES',
    'SELECT_GAME':   'SELECT_GAME',
  },

  selectGame,
  invalidateGames,
  fetchGamesIfNeeded,
}

export default Game;

const {RECEIVE_GAMES, REQUEST_GAMES, REQUEST_ERROR, INVALID_GAMES, SELECT_GAME} = Game.LABELS;

function selectGame(game) {
  return { 'type': SELECT_GAME, game }
}

function invalidateGames(game) {
  return { 'type': INVALID_GAMES, game }
}

function requestGames() {
  return {'type': REQUEST_GAMES}
}

function fetchGamesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState())) {
      return dispatch(fetchGames())
    }
  }
}

function receiveGames(json) {
  console.warn('receiveGames', json)
  return {
    'type': RECEIVE_GAMES,
    'results': json,
    'lastUpdated': Date.now()
  }
}

function requestError(errPath, err) {
  return {'type': REQUEST_ERROR, errPath, err}
}

function fetchGames() {
  // let q =  + (query ? '?where='+encodeURIComponent(JSON.stringify(query)) : '')
  return dispatch => {
    dispatch(requestGames())
    return fetcher(`/game/`, {method: 'GET' })
      .then(response => response.json())
      .then(json => dispatch(receiveGames(json)))
      .catch(err => {
        dispatch(requestError('/game', err))
        console.error('Failed HTTP:', err);
      })
  }
}

function shouldFetchGames(state) {
  console.warn('shouldFetchGames', state)
  const games = state.results
  if (state.isFetching) {
    return false
  }
  if (!games || games.length < 1) {
    return true
  }
  return state.didInvalidate
}
