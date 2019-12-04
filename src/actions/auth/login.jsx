export const LOGIN = 'LOGIN';
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const FAIL_LOGIN = 'FAIL_LOGIN';

export const login = payload => {
  return {
    type: LOGIN,
    accessToken: null,
    payload: payload,
  };
};

export const successLogin = accessToken => {
  return {
    type: SUCCESS_LOGIN,
    accessToken: accessToken,
  };
};

export const failLogin = () => {
  return {
    type: FAIL_LOGIN,
    accessToken: null,
  };
};
