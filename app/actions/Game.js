import {fetcher} from '../utils'

export default {
  RECEIVE_GAMES,
  REQUEST_GAMES,
  REQUEST_ERROR,
  INVALID_GAMES,
  SELECT_GAME,

  selectGame,
  invalidateGames,
  fetchGamesIfNeeded,
}
const REQUEST_GAMES     = 'REQUEST_GAMES'
const RECEIVE_GAMES     = 'RECEIVE_GAMES'
const REQUEST_ERROR     = 'REQUEST_ERROR'
const INVALID_GAMES     = 'INVALID_GAMES'
const SELECT_GAME       = 'SELECT_GAME'

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
    'games': json,
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
        console.error('Failed HTTP:', err);
      })
  }
}

function shouldFetchGames(state) {
  console.warn('shouldFetchGames', state)
  const games = state.gamesByUser
  if (state.isFetching) {
    return false
  }
  if (!games || games.length < 1) {
    return true
  }
  return state.didInvalidate
}
