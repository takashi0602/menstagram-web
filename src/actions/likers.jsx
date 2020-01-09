export const LIKERS = 'LIKERS';
export const SUCCESS_LIKERS = 'SUCCESS_LIKERS';
export const FAIL_LIKERS = 'FAIL_LIKERS';

export const likers = payload => {
  return {
    type: LIKERS,
    accessToken: payload.accessToken,
    params: payload.params,
    likerList: [],
    status: -1,
    postId: payload.params.post_id
  };
};

export const successLikers = (response, postId) => {
  return {
    type: SUCCESS_LIKERS,
    likerList: response.data,
    status: response.status,
    postId: postId
  };
};

export const failLikers = status => {
  return {
    type: FAIL_LIKERS,
    likerList: [],
    status: status
  };
};
