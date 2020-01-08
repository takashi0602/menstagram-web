export const LIKE_POST = 'LIKE_POST';
export const SUCCESS_LIKE_POST = 'SUCCESS_LIKE_POST';
export const FAIL_LIKE_POST = 'FAIL_LIKE_POST';
export const NOT_LIKE_POST = 'NOT_LIKE_POST';
export const SUCCESS_NOT_LIKE_POST = 'SUCCESS_LIKE_POST';
export const FAIL_NOT_LIKE_POST = 'FAIL_LIKE_POST';

export const likePost = payload => {
  return {
    type: LIKE_POST,
    accessToken: payload.accessToken,
    postId: payload.postId,
    success: false
  };
};

export const successLikePost = postId => {
  return {
    type: SUCCESS_LIKE_POST,
    postId: postId,
    success: true
  };
};

export const failLikePost = () => {
  return {
    type: FAIL_LIKE_POST,
    postId: -1,
    success: false
  }
};

export const notLikePost = payload => {
  return {
    type: NOT_LIKE_POST,
    accessToken: payload.accessToken,
    postId: payload.postId,
    success: false
  };
};

export const successNotLikePost = postId => {
  return {
    type: SUCCESS_NOT_LIKE_POST,
    postId: postId,
    success: true
  };
};

export const failNotLikePost = () => {
  return {
    type: FAIL_NOT_LIKE_POST,
    postId: -1,
    success: false
  }
};
