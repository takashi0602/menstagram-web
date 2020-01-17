export const LOGIN = 'LOGIN';
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const FAIL_LOGIN = 'FAIL_LOGIN';

export const login = payload => {
  return {
    type: LOGIN,
    accessToken: null,
    payload: payload
  };
};

export const successLogin = payload => {
  return {
    type: SUCCESS_LOGIN,
    accessToken: payload.accessToken,
    userId: payload.userId
  };
};

export const failLogin = () => {
  return {
    type: FAIL_LOGIN,
    accessToken: null,
    userId: ''
  };
};
