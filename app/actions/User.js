// import fetch from 'isomorphic-fetch'
import { fetcher } from '../utils';
import { pushState } from 'redux-router';

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
  return { 'type': LOGIN.REQUEST, is }
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
  return (dispatch, state) => {
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
      try {
        console.warn('Login', response)
        dispatch(loginUserSuccess(response.token));
        dispatch(pushState(null, redirect));
      } catch (e) {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    })
    .catch(error => {
      dispatch(loginUserFailure(error));
    })
  }
}

