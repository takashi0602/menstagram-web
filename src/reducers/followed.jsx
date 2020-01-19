const initialState = {
  followedList: [],
  followedStatus: -1
};

export function followed(state = initialState, action) {
  switch (action.type) {
    case 'FOLLOWED':
      return state;
    case 'SUCCESS_FOLLOWED':
      return {
        followedList: action.followedList,
        followedStatus: action.followedStatus,
        followedTargetUserId: action.followedTargetUserId
      };
    case 'FAIL_FOLLOWED':
      return {
        followedList: action.followedList,
        followedStatus: action.followedStatus,
        followedTargetUserId: action.followedTargetUserId
      };
    default:
      return state;
  }
}
