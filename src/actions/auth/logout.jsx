export const LOGOUT = 'LOGOUT';
export const SUCCESS_LOGOUT = 'SUCCESS_LOGOUT';
export const FAIL_LOGOUT = 'FAIL_LOGOUT';

export const logout = () => {
  return {
    type: LOGOUT,
    accessToken: null,
    status: null
  }
};

export const successLogout = () => {
  return {
    type: SUCCESS_LOGOUT,
    accessToken: null,
    status: 'success'
  }
};

export const failLogout = () => {
  return {
    type: FAIL_LOGOUT,
    accessToken: null,
    status: 'error'
  }
};
