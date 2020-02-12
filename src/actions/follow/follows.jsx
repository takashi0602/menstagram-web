export const FOLLOWS = 'FOLLOWS';
export const SUCCESS_FOLLOWS = 'SUCCESS_FOLLOWS';
export const FAIL_FOLLOWS = 'FAIL_FOLLOWS';
export const CLEAR_FOLLOWS = 'CLEAR_FOLLOWS';

export const follows = payload => {
  return {
    type: FOLLOWS,
    accessToken: payload.accessToken,
    params: payload.params,
    follows: [],
    status: -1
  };
};

export const successFollows = (response, action) => {
  return {
    type: SUCCESS_FOLLOWS,
    follows: response.data,
    status: response.status,
    targetUserId: action.params.user_id
  };
};

export const failFollows = status => {
  return {
    type: FAIL_FOLLOWS,
    follows: [],
    status: status,
    targetUserId: ''
  };
};

export const clearFollows = () => {
  return {
    type: CLEAR_FOLLOWS,
    follows: [],
    status: -1,
    targetUserId: ''
  };
};
