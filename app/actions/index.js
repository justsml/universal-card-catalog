import fetch from 'isomorphic-fetch'

export const REQUEST_GAMES     = 'REQUEST_GAMES'
export const RECEIVE_GAMES     = 'RECEIVE_GAMES'
export const REQUEST_ERROR     = 'REQUEST_ERROR'
export const SELECT_GAME       = 'SELECT_GAME'
export const INVALIDATE_GAMES  = 'INVALIDATE_GAMES'

export function selectGame(game) {
  return { 'type': SELECT_GAME, game }
}

export function invalidateGames(game) {
  return { 'type': INVALIDATE_GAMES, game }
}

function requestGames() {
  return {'type': REQUEST_GAMES}
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
    return fetch(`/game/`, {method: 'GET' })
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

export function fetchGamesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState())) {
      return dispatch(fetchGames())
    }
  }
}

// // Meet our first thunk action creator!
// // Though its insides are different, you would use it just like any other action creator:
// // store.dispatch(fetchGames())
// export function fetchGames(query) {
//   // Thunk middleware knows how to handle functions.
//   // It passes the dispatch method as an argument to the function,
//   // thus making it able to dispatch actions itself.
//   return function (dispatch) {
//     // First dispatch: the app state is updated to inform
//     // that the API call is starting.

//     dispatch(requestGames(query))

//     // The function called by the thunk middleware can return a value,
//     // that is passed on as the return value of the dispatch method.
//     // In this case, we return a promise to wait for.
//     // This is not required by thunk middleware, but it is convenient for us.

//     return fetch({url: `/games/` + (query ? '?where='+encodeURIComponent(JSON.stringify(query)) : ''), method: 'GET' })
//       .then(response => response.json())
//       .then(json =>
//         // We can dispatch many times!
//         // Here, we update the app state with the results of the API call.
//         dispatch(receiveGames(query, json))
//       )
//       .catch(err => {
//         dispatch(requestError('games', err));
//       })
//       // catch any error in the network call.
//   }
// }
