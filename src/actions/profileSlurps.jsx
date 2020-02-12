export const PROFILE_SLURPS = 'PROFILE_SLURPS';
export const SUCCESS_PROFILE_SLURPS = 'SUCCESS_PROFILE_SLURPS';
export const FAIL_PROFILE_SLURPS = 'FAIL_PROFILE_SLURPS';
export const CLEAR_PROFILE_SLURPS = 'CLEAR_PROFILE_SLURPS';

export const profileSlurps = payload => {
  return {
    type: PROFILE_SLURPS,
    accessToken: payload.accessToken,
    params: payload.params,
    slurps: [],
    status: 200
  };
};

export const successProfileSlurps = response => {
  return {
    type: SUCCESS_PROFILE_SLURPS,
    slurps: response.data,
    status: response.status
  };
};

export const failProfileSlurps = status => {
  return {
    type: FAIL_PROFILE_SLURPS,
    slurps: [],
    status: status
  };
};

export const clearProfileSlurps = () => {
  return {
    type: CLEAR_PROFILE_SLURPS,
    slurps: [],
    status: -1
  };
};
