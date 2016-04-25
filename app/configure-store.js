import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware                  from 'redux-thunk'
import createLogger                     from 'redux-logger'
import rootReducer                      from './reducers'

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, createLogger()),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ));
  return store;
}


export default configureStore;
