export const FOLLOWED = 'FOLLOWED';
export const SUCCESS_FOLLOWED = 'SUCCESS_FOLLOWED';
export const FAIL_FOLLOWED = 'FAIL_FOLLOWED';

export const followed = payload => {
  return {
    type: FOLLOWED,
    accessToken: payload.accessToken,
    params: payload.params,
    followedList: [],
    followedStatus: -1
  };
};

export const successFollowed = (response, action) => {
  return {
    type: SUCCESS_FOLLOWED,
    followedList: response.data,
    followedStatus: response.status,
    followedTargetUserId: action.params.user_id
  };
};

export const failFollowed = status => {
  return {
    type: FAIL_FOLLOWED,
    followedList: [],
    followedStatus: status,
    followedTargetUserId: ''
  };
};
