const initialState = {
  userPosts: [],
  userPostsStatus: -1
};

export function userPosts(state = initialState, action) {
  switch (action.type) {
    case 'USER_POSTS':
      return state;
    case 'SUCCESS_USER_POSTS':
      return {
        userPosts: action.userPosts,
        userPostsStatus: action.status
      };
    case 'FAIL_USER_POSTS':
      return {
        userPosts: action.userPosts,
        userPostsStatus: action.status
      };
    default:
      return state;
  }
}
