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

export const successPost = (status) => {
  return {
    type: SUCCESS_POST,
    status: status
  };
};

export const failPost = (status) => {
  return {
    type: FAIL_POST,
    status: status
  };
};
