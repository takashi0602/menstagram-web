const initialState = {
  followingList: [],
  followingStatus: -1,
  followingTargetUserId: ''
};

export function following(state = initialState, action) {
  switch (action.type) {
    case 'FOLLOWING':
      return state;
    case 'SUCCESS_FOLLOWING':
      return {
        followingList: action.followingList,
        followingStatus: action.followingStatus,
        followingTargetUserId: action.followingTargetUserId
      };
    case 'FAIL_FOLLOWING':
      return {
        followingList: action.followingList,
        followingStatus: action.followingStatus,
        followingTargetUserId: action.followingTargetUserId
      };
    case 'CLEAR_FOLLOWING':
      return {
        followingList: action.followingList,
        followingStatus: action.followingStatus,
        followingTargetUserId: action.followingTargetUserId
      };
    default:
      return state;
  }
}
