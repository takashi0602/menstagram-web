export const PROFILE_POSTS = 'PROFILE_POSTS';
export const SUCCESS_PROFILE_POSTS = 'SUCCESS_PROFILE_POSTS';
export const FAIL_PROFILE_POSTS = 'FAIL_PROFILE_POSTS';

export const profilePosts = payload => {
  return {
    type: PROFILE_POSTS,
    accessToken: payload.accessToken,
    params: payload.params,
    posts: [],
    status: 200
  };
};

export const successProfilePosts = response => {
  return {
    type: SUCCESS_PROFILE_POSTS,
    posts: response.data,
    status: response.status
  };
};

export const failProfilePosts = status => {
  return {
    type: FAIL_PROFILE_POSTS,
    posts: [],
    status: status
  };
};
