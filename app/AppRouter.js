import { Router, Route, browserHistory } from 'react-router'
// import { createHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'


export function createAppRouter(store, components) {
  const history = syncHistoryWithStore(browserHistory, store)
  const {App, LoginForm, SignupForm} = components;
  return {
    render() {
      return (
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm}/>
          <Route path="signup" component={SignupForm}/>
        </Route>
      </Router>
      )
    }

  }
}