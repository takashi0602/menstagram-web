const initialState = {
  slurpId: -1,
  success: false
};

export function yum(state = initialState, action) {
  switch (action.type) {
    case 'YUM':
      return state;
    case 'SUCCESS_YUM':
      return {
        slurpId: action.slurpId,
        success: action.success
      };
    case 'FAIL_YUM':
      return {
        slurpId: action.slurpId,
        success: action.success
      };
    case 'UNYUM':
      return state;
    case 'SUCCESS_UNYUM':
      return {
        slurpId: action.slurpId,
        success: action.success
      };
    case 'FAIL_UNYUM':
      return {
        slurpId: action.slurpId,
        success: action.success
      };
    default:
      return state;
  }
}
