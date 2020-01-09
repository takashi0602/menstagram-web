export const PROFILE = 'PROFILE';
export const SUCCESS_PROFILE = 'SUCCESS_PROFILE';
export const FAIL_PROFILE = 'FAIL_PROFILE';

export const profile = payload => {
  return {
    type: PROFILE,
    accessToken: payload.accessToken,
    params: payload.params,
    profile: {},
    profileStatus: -1
  };
};

export const successProfile = response => {
  return {
    type: SUCCESS_PROFILE,
    profile: response.data,
    profileStatus: response.status
  };
};

export const failProfile = status => {
  return {
    type: FAIL_PROFILE,
    profile: {},
    profileStatus: status
  };
};
