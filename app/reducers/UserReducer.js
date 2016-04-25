import { UserActions } from '../actions'
const { LOGIN, REGISTER, LOGOUT_USER } = UserActions.LABELS

export default {
  userReducer
}

const userReducer = (state = {}, { type, payload }) => {
  if (type === USER_LOGGED_IN) {
    return payload
  }
  if (type === USER_LOGGED_OUT) {
    return {}
  }
  return state
}
