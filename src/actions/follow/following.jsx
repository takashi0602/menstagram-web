export const FOLLOWING = 'FOLLOWING';
export const SUCCESS_FOLLOWING = 'SUCCESS_FOLLOWING';
export const FAIL_FOLLOWING = 'FAIL_FOLLOWING';

export const following = payload => {
  return {
    type: FOLLOWING,
    accessToken: payload.accessToken,
    params: payload.params,
    followingList: [],
    followingStatus: -1
  };
};

export const successFollowing = (response, action) => {
  return {
    type: SUCCESS_FOLLOWING,
    followingList: response.data,
    followingStatus: response.status,
    followingTargetUserId: action.params.user_id
  };
};

export const failFollowing = status => {
  return {
    type: FAIL_FOLLOWING,
    followingList: [],
    followingStatus: status,
    followingTargetUserId: ''
  };
};
