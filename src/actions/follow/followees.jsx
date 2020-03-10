export const FOLLOWEES = 'FOLLOWEES';
export const SUCCESS_FOLLOWEES = 'SUCCESS_FOLLOWEES';
export const FAIL_FOLLOWEES = 'FAIL_FOLLOWEES';
export const CLEAR_FOLLOWEES = 'CLEAR_FOLLOWEES';

export const followees = payload => {
  return {
    type: FOLLOWEES,
    accessToken: payload.accessToken,
    params: payload.params,
    followees: [],
    status: -1
  };
};

export const successFollowees = (response, action) => {
  return {
    type: SUCCESS_FOLLOWEES,
    followees: response.data,
    status: response.status,
    targetUserId: action.params.user_id
  };
};

export const failFollowees = status => {
  return {
    type: FAIL_FOLLOWEES,
    followees: [],
    status: status,
    targetUserId: ''
  };
};

export const clearFollowees = () => {
  return {
    type: CLEAR_FOLLOWEES,
    followees: [],
    status: -1,
    targetUserId: ''
  };
};
