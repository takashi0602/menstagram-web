const initialState = {
  profile: {},
  profileStatus: -1
};

export function profile(state = initialState, action) {
  switch (action.type) {
    case 'PROFILE':
      return state;
    case 'SUCCESS_PROFILE':
      return {
        profile: action.profile,
        profileStatus: action.profileStatus
      };
    case 'FAIL_PROFILE':
      return {
        prorile: action.profile,
        profileStatus: action.profileStatus
      };
    default:
      return state;
  }
}
