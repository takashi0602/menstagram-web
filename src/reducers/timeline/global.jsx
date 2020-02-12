const initialState = {
  slurpList: [],
  status: -1
};

export function globalTimeline(state = initialState, action) {
  switch (action.type) {
    case 'GLOBAL_TIMELINE':
      return {
        slurpList: action.slurpList,
        status: action.status
      };
    case 'SUCCESS_GLOBAL_TIMELINE':
      return {
        slurpList: action.slurpList,
        status: action.status
      };
    case 'FAIL_GLOBAL_TIMELINE':
      return {
        slurpList: action.slurpList,
        status: action.status
      };
    case 'CLEAR_GLOBAL_TIMELINE':
      return {
        slurpList: action.slurpList,
        status: action.status
      };
    default:
      return state;
  }
}
