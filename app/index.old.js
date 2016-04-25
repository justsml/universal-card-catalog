// Do this once before any other code in your app
import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import App from './components/App';

// import { homeReducer } from './reducers/reducers';

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const store = createStoreWithMiddleware(homeReducer);
import { connect } from 'react-redux';
import createTitle from 'shared/components/title';

const createApp = React => ({ title }) => {
  const Title = createTitle(React);

  return (
    <div>
      <Title title={ title } />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { title } = state;
  return { title };
};

// Connect props to component
export default React => {
  const App = createApp(React);
  return connect(mapStateToProps)(App);
};
