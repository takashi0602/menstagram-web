const initialState = {
  success: false
};

export function profileEdit(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESS_PROFILE_EDIT':
      return {
        success: action.success
      };
    case 'FAIL_PROFILE_EDIT':
      return {
        success: action.success
      };
    default:
      return state;
  }
}
