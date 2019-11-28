export const POST = 'POST';
export const SUCCESS_POST = 'SUCCESS_POST';
export const FAIL_POST = 'FAIL_POST';

export const post = (payload, accessToken) => {
  return {
    type: POST,
    accessToken: accessToken,
    payload: payload,
    status: null
  };
};

export const successPost = () => {
  return {
    type: SUCCESS_POST,
    status: 'success'
  };
};

export const failPost = () => {
  return {
    type: FAIL_POST,
    status: 'error'
  };
};
