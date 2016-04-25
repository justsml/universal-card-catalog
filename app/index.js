import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import configureStore from './configure-store'
import { createAppRouter } from './AppRouter'
const store = configureStore()

const AppRouter  = createAppRouter(store, {App, LoginForm, SignupForm})

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
)
