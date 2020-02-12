const initialState = {
  slurpList: [],
  status: -1
};

export function yums(state = initialState, action) {
  switch (action.type) {
    case 'YUMS':
      return {
        slurpList: action.slurpList,
        status: action.status
      };
    case 'SUCCESS_YUMS':
      return {
        slurpList: action.slurpList,
        status: action.status
      };
    case 'FAIL_YUMS':
      return {
        slurpList: action.slurpList,
        status: action.status
      };
    default:
      return state;
  }
}
