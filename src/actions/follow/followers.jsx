export const FOLLOWERS = 'FOLLOWERS';
export const SUCCESS_FOLLOWERS = 'SUCCESS_FOLLOWERS';
export const FAIL_FOLLOWERS = 'FAIL_FOLLOWERS';
export const CLEAR_FOLLOWERS = 'CLEAR_FOLLOWERS';

export const followers = payload => {
  return {
    type: FOLLOWERS,
    accessToken: payload.accessToken,
    params: payload.params,
    followers: [],
    status: -1
  };
};

export const successFollowers = (response, action) => {
  return {
    type: SUCCESS_FOLLOWERS,
    followers: response.data,
    status: response.status,
    targetUserId: action.params.user_id
  };
};

export const failFollowers = status => {
  return {
    type: FAIL_FOLLOWERS,
    followers: [],
    status: status,
    targetUserId: ''
  };
};

export const clearFollowers = () => {
  return {
    type: CLEAR_FOLLOWERS,
    followers: [],
    status: -1,
    targetUserId: ''
  };
};
