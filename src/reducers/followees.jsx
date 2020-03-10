const initialState = {
  followees: [],
  status: -1,
  targetUserId: ''
};

export function followees(state = initialState, action) {
  switch (action.type) {
    case 'FOLLOWEES':
      return state;
    case 'SUCCESS_FOLLOWEES':
      return {
        followees: action.followees,
        status: action.status,
        targetUserId: action.targetUserId
      };
    case 'FAIL_FOLLOWEES':
      return {
        followees: action.followees,
        status: action.status,
        targetUserId: action.targetUserId
      };
    case 'CLEAR_FOLLOWEES':
      return {
        followees: action.followees,
        status: action.status,
        targetUserId: action.targetUserId
      };
    default:
      return state;
  }
}
