const initialState = {
  posts: [],
  status: -1
};

export function profilePosts(state = initialState, action) {
  switch (action.type) {
    case 'PROFILE_POSTS':
      return {
        posts: action.posts,
        status: action.status
      };
    case 'SUCCESS_PROFILE_POSTS':
      return {
        posts: action.posts,
        status: action.status
      };
    case 'FAIL_PROFILE_POSTS':
      return {
        posts: action.posts,
        status: action.status
      };
    case 'CLEAR_PROFILE_POSTS':
      return initialState;
    default:
      return state;
  }
}
