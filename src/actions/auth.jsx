export const REGISTER = 'REGISTER';
export const SUCCESS_REGISTER = 'SUCCESS_REGISTER';
export const FAIL_REGISTER = 'FAIL_REGISTER';

export const register = (payload) => {
  return {
    type: REGISTER,
    accessToken: null,
    payload: payload,
    status: null
  }
};

export const successRegister = (accessToken) => {
  return {
    type: SUCCESS_REGISTER,
    accessToken: accessToken,
    status: 'success'
  }
};

export const failRegister = () => {
  return {
    type: FAIL_REGISTER,
    accessToken: null,
    status: 'error'
  }
};
