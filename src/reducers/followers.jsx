const initialState = {
  followers: [],
  status: -1,
  targetUserId: ''
};

export function followers(state = initialState, action) {
  switch (action.type) {
    case 'FOLLOWERS':
      return state;
    case 'SUCCESS_FOLLOWERS':
      return {
        followers: action.followers,
        status: action.status,
        targetUserId: action.targetUserId
      };
    case 'FAIL_FOLLOWERS':
      return {
        followers: action.followers,
        status: action.status,
        targetUserId: action.targetUserId
      };
    case 'CLEAR_FOLLOWERS':
      return {
        followers: action.followers,
        status: action.status,
        targetUserId: action.targetUserId
      };
    default:
      return state;
  }
}
