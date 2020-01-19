export const LIKES = 'LIKES';
export const SUCCESS_LIKES = 'SUCCESS_LIKES';
export const FAIL_LIKES = 'FAIL_LIKES';

export const likes = payload => {
  return {
    type: LIKES,
    accessToken: payload.accessToken,
    params: payload.params,
    postList: payload.postList,
    status: 200
  };
};

export const successLikes = response => {
  return {
    type: SUCCESS_LIKES,
    postList: response.data,
    status: response.status
  };
};

export const failLikes = status => {
  return {
    type: FAIL_LIKES,
    postList: [],
    status: status
  };
};
