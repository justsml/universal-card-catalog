import { UserActions } from '../actions'
const { LOGIN, REGISTER, LOGOUT_USER } = UserActions.LABELS

export default {
  userReducer
}

const userReducer = (state = {}, { type, user, token, error, message }) => {
  if (type === LOGIN.REQUEST || type === REGISTER.REQUEST) {
    return Object.assign({}, state, {'isFetching': true})
  } else if (type === LOGIN.FAILURE || type === REGISTER.FAILURE) {
    return Object.assign({}, state, {error, message, 'isFetching': false})
  } else if (type === LOGIN.SUCCESS || type === REGISTER.SUCCESS) {
    return Object.assign({}, state, {user, token, 'isFetching': false})
  } else if (type === LOGOUT_USER) {
    localStorage.removeItem('token');
    return Object.assign({}, state, {user: null, token: null, 'isFetching': false})
  }
  return state
}
