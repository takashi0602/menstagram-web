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
    userId: payload.userId,
    success: false
  };
};

export const successFollow = userId => {
  return {
    type: SUCCESS_FOLLOW,
    userId: userId,
    success: true
  };
};

export const failFollow = () => {
  return {
    type: FAIL_FOLLOW,
    userId: -1,
    success: false
  }
};

export const unfollow = payload => {
  return {
    type: UNFOLLOW,
    accessToken: payload.accessToken,
    userId: payload.userId,
    success: false
  };
};

export const successUnfollow = userId => {
  return {
    type: SUCCESS_UNFOLLOW,
    userId: userId,
    success: true
  };
};

export const failUnfollow = () => {
  return {
    type: FAIL_UNFOLLOW,
    userId: -1,
    success: false
  }
};
