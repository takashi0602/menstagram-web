const initialState = {
  slurpYums: [],
  status: -1
};

export function slurpYums(state = initialState, action) {
  switch (action.type) {
    case 'SLURP_YUMS':
      return {
        slurpYums: action.slurpYums,
        status: action.status,
        slurpId: action.slurpId
      };
    case 'SUCCESS_SLURP_YUMS':
      return {
        slurpYums: action.slurpYums,
        status: action.status,
        slurpId: action.slurpId
      };
    case 'FAIL_SLURP_YUMS':
      return {
        slurpYums: action.slurpYums,
        status: action.status
      };
    default:
      return state;
  }
}
