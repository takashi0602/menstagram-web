const initialState = {
  slurpList: [],
  status: -1
};

export function privateTimeline(state = initialState, action) {
  switch (action.type) {
    case 'PRIVATE_TIMELINE':
      return {
        slurpList: action.slurpList,
        status: action.status
      };
    case 'SUCCESS_PRIVATE_TIMELINE':
      return {
        slurpList: action.slurpList,
        status: action.status
      };
    case 'FAIL_PRIVATE_TIMELINE':
      return {
        slurpList: action.slurpList,
        status: action.status
      };
    case 'CLEAR_PRIVATE_TIMELINE':
      return {
        slurpList: action.slurpList,
        status: action.status
      };
    default:
      return state;
  }
}
