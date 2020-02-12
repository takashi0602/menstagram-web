const initialState = {
  follows: [],
  status: -1,
  targetUserId: ''
};

export function follows(state = initialState, action) {
  switch (action.type) {
    case 'FOLLOWS':
      return state;
    case 'SUCCESS_FOLLOWS':
      return {
        follows: action.follows,
        status: action.status,
        targetUserId: action.targetUserId
      };
    case 'FAIL_FOLLOWS':
      return {
        follows: action.follows,
        status: action.status,
        targetUserId: action.targetUserId
      };
    case 'CLEAR_FOLLOWS':
      return {
        follows: action.follows,
        status: action.status,
        targetUserId: action.targetUserId
      };
    default:
      return state;
  }
}
