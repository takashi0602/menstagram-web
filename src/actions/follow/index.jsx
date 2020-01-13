export const FOLLOW = 'FOLLOW';
export const SUCCESS_FOLLOW = 'SUCCESS_FOLLOW';
export const FAIL_FOLLOW = 'FAIL_FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SUCCESS_UNFOLLOW = 'SUCCESS_UNFOLLOW';
export const FAIL_UNFOLLOW = 'FAIL_UNFOLLOW';

export const follow = payload => {
  return {
    type: FOLLOW,
    accessToken: payload.accessToken,
    targetUserId: payload.targetUserId,
    success: false
  };
};

export const successFollow = targetUserId => {
  return {
    type: SUCCESS_FOLLOW,
    targetUserId: targetUserId,
    success: true
  };
};

export const failFollow = () => {
  return {
    type: FAIL_FOLLOW,
    targetUserId: -1,
    success: false
  }
};

export const unfollow = payload => {
  return {
    type: UNFOLLOW,
    accessToken: payload.accessToken,
    targetUserId: payload.targetUserId,
    success: false
  };
};

export const successUnfollow = targetUserId => {
  return {
    type: SUCCESS_UNFOLLOW,
    targetUserId: targetUserId,
    success: true
  };
};

export const failUnfollow = () => {
  return {
    type: FAIL_UNFOLLOW,
    targetUserId: -1,
    success: false
  }
};
