export const USER_POSTS = 'USER_POSTS';
export const SUCCESS_USER_POSTS = 'SUCCESS_USER_POSTS';
export const FAIL_USER_POSTS = 'FAIL_USER_POSTS';

export const userPosts = payload => {
  return {
    type: USER_POSTS,
    accessToken: payload.accessToken,
    params: payload.params,
    userPosts: payload.userPosts,
    userPostStatus: -1
  };
};

export const successUserPosts = response => {
  return {
    type: SUCCESS_USER_POSTS,
    userPosts: response.data,
    userPostsStatus: response.status
  };
};

export const failUserPosts = status => {
  return {
    type: FAIL_USER_POSTS,
    userPosts: [],
    userPostsStatus: status
  };
};
