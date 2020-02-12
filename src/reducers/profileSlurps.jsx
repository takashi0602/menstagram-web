const initialState = {
  slurps: [],
  status: -1
};

export function profileSlurps(state = initialState, action) {
  switch (action.type) {
    case 'PROFILE_SLURPS':
      return {
        slurps: action.slurps,
        status: action.status
      };
    case 'SUCCESS_PROFILE_SLURPS':
      return {
        slurps: action.slurps,
        status: action.status
      };
    case 'FAIL_PROFILE_SLURPS':
      return {
        slurps: action.slurps,
        status: action.status
      };
    case 'CLEAR_PROFILE_SLURPS':
      return initialState;
    default:
      return state;
  }
}
