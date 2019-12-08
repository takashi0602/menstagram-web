export const LOGOUT = 'LOGOUT';
export const SUCCESS_LOGOUT = 'SUCCESS_LOGOUT';
export const FAIL_LOGOUT = 'FAIL_LOGOUT';

export const logout = payload => {
  return {
    type: LOGOUT,
    accessToken: payload
  };
};

export const successLogout = () => {
  return {
    type: SUCCESS_LOGOUT,
    accessToken: null
  };
};

export const failLogout = accessToken => {
  return {
    type: FAIL_LOGOUT,
    accessToken: accessToken
  };
};
