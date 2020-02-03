export const PROFILE_EDIT = 'PROFILE_EDIT';
export const SUCCESS_PROFILE_EDIT = 'SUCCESS_PROFILE_EDIT';
export const FAIL_PROFILE_EDIT = 'FAIL_PROFILE_EDIT';
export const CLEAR_PROFILE_EDIT = 'CLEAR_PROFILE_EDIT';

export const profileEdit = payload => {
  return {
    type: PROFILE_EDIT,
    accessToken: payload.accessToken,
    profile: payload.profile,
    userId: payload.userId,
    success: false
  };
};

export const successProfileEdit = () => {
  return {
    type: SUCCESS_PROFILE_EDIT,
    success: true
  };
};

export const failProfileEdit = () => {
  return {
    type: FAIL_PROFILE_EDIT,
    success: false
  };
};

export const clearProfileEdit = () => {
  return {
    type: CLEAR_PROFILE_EDIT,
    success: false
  };
};
