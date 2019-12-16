import { SET_USER_INFO, CLEAR_USER_INFO } from 'actions/user.js';

const defaultState = null;

export default function user(state = defaultState, action) {
  switch (action.type) {
    case SET_USER_INFO: {
      return action.userInfo;
    }
    case CLEAR_USER_INFO: {
      return defaultState;
    }
    default: return state;
  }
}
