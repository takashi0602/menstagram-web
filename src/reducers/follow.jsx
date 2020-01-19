const initialState = {
  targetUserId: -1,
  success: false
};

export function follow(state = initialState, action) {
  switch (action.type) {
    case 'FOLLOW':
      return state;
    case 'SUCCESS_FOLLOW':
      return {
        targetUserId: action.targetUserId,
        success: action.success
      };
    case 'FAIL_FOLLOW':
      return {
        targetUserId: action.targetUserId,
        success: action.success
      };
    case 'UNFOLLOW':
      return state;
    case 'SUCCESS_UNFOLLOW':
      return {
        targetUserId: action.targetUserId,
        success: action.success
      };
    case 'FAIL_UNFOLLOW':
      return {
        targetUserId: action.targetUserId,
        success: action.success
      };
    default:
      return state;
  }
}
