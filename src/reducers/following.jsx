const initialState = {
  followingList: [],
  followingStatus: -1,
  targetUserId: ''
};

export function following(state = initialState, action) {
  switch (action.type) {
    case 'FOLLOWING':
      return state;
    case 'SUCCESS_FOLLOWING':
      return {
        followingList: action.followingList,
        followingStatus: action.followingStatus,
        targetUserId: action.followingTargetUserId
      };
    case 'FAIL_FOLLOWING':
      return {
        followingList: action.followingList,
        followingStatus: action.followingStatus,
        targetUserId: action.params.user_id
      };
    default:
      return state;
  }
}
