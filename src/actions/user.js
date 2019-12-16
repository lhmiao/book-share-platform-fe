export const SET_USER_INFO = 'SET_USER_INFO';
export const CLEAR_USER_INFO = 'CLEAR_USER_IFNO';

export function setUserInfo(userInfo) {
  return {
    type: SET_USER_INFO,
    userInfo,
  };
}

export function clearUserInfo() {
  return { type: CLEAR_USER_INFO };
}
