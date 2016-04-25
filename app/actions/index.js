import fetch from 'isomorphic-fetch'
import UserActions from './User'
import GameActions from './Game'
const { SELECT_GAME, INVALID_GAMES, REQUEST_GAMES, RECEIVE_GAMES } = GameActions
const { LOGIN, REGISTER } = UserActions



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
