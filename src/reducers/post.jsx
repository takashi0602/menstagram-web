const initialState = {
  success: false
};

export function post(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESS_POST':
      return {
        success: action.success
      };
    case 'FAIL_POST':
      return {
        success: action.success
      };
    default:
      return state;
  }
}
