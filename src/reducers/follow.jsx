const initialState = {
  userId: -1,
  success: false
};

export function follow(state = initialState, action) {
  switch (action.type) {
    case 'FOLLOW':
      return state;
    case 'SUCCESS_FOLLOW':
      return {
        userId: action.userId,
        success: action.success
      };
    case 'FAIL_FOLLOW':
      return {
        userId: action.userId,
        success: action.success
      };
    case 'UNFOLLOW':
      return state;
    case 'SUCCESS_UNFOLLOW':
      return {
        userId: action.userId,
        success: action.success
      };
    case 'FAIL_UNFOLLOW':
      return {
        userId: action.userId,
        success: action.success
      };
    default:
      return state;
  }
}
