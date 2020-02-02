const initialState = {
  profile: {},
  profileStatus: -1
};

export function profile(state = initialState, action) {
  switch (action.type) {
    case 'PROFILE':
      return {
        profile: action.profile,
        profileStatus: action.profileStatus
      };
    case 'SUCCESS_PROFILE':
      return {
        profile: action.profile,
        profileStatus: action.profileStatus
      };
    case 'FAIL_PROFILE':
      return {
        profile: action.profile,
        profileStatus: action.profileStatus
      };
    case 'CLEAR_PROFILE':
      return initialState;
    default:
      return state;
  }
}
