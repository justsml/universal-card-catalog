// import fetch from 'isomorphic-fetch'
import { fetcher } from '../utils';
import { pushState } from 'redux-router';
const LOGOUT_USER = 'LOGOUT_USER'
const LOGIN = {
  REQUEST: 'USER_LOGIN_REQUEST',
  FAILURE: 'USER_LOGIN_FAILURE',
  SUCCESS: 'USER_LOGIN_SUCCESS',
}
const REGISTER = {
  REQUEST: 'USER_REGISTER_REQUEST',
  FAILURE: 'USER_REGISTER_FAILURE',
  SUCCESS: 'USER_REGISTER_SUCCESS',
}

export default {
  LABELS: {
    LOGOUT_USER,
    LOGIN,
    REGISTER,
  },
  loginUserSuccess,
  loginUserFailure,
  loginUserRequest,
  logout,
  logoutAndRedirect,
  loginUser
}

// const USER_LOGIN_REQUEST   = 'USER_LOGIN_REQUEST'
// const USER_LOGIN_FAILURE   = 'USER_LOGIN_FAILURE'
// const USER_LOGIN_SUCCESS   = 'USER_LOGIN_SUCCESS'
// const USER_LOGOUT          = 'USER_LOGOUT'

function loginUserSuccess({token, user}) {
  localStorage.setItem('token', token)
  return {
    'type': LOGIN.SUCCESS,
    token,
    user
  }
}

function loginUserFailure(error) {
  localStorage.removeItem('token')
  return {
    'type': LOGIN.FAILURE,
    'error': {
      'status': error.response.status,
      'statusText': error.response.statusText
    }
  }
}

function loginUserRequest() {
  return { 'type': LOGIN.REQUEST, 'isFetching': true }
}

function logout() {
  localStorage.removeItem('token')
  return {
    'type': LOGOUT_USER,
    'user': null,
    'token': null
  };
}

function logoutAndRedirect() {
  return (dispatch) => {
    dispatch(logout());
    dispatch(pushState(null, '/login'));
  }
}

function loginUser(email, password, redirect = '/') {
  return dispatch => {
    dispatch(loginUserRequest());
    return fetcher('/auth/login/', {
      'method': 'POST',
      'body': JSON.stringify({email, password})
    })
    .then(response => {
      console.warn('Login', response)
      try {
        dispatch(loginUserSuccess(response));
        dispatch(pushState(null, redirect));
      } catch (e) {
        dispatch(loginUserFailure({
          'error': {'status': 403, 'statusText': 'Invalid token'}
        }));
      }
    })
    .catch(error => {
      dispatch(loginUserFailure(error));
    })
  }
}

