const initialState = {
  status: null
};

export function post(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESS_POST':
      return {
        status: action.status
      };
    case 'FAIL_POST':
      return {
        status: action.status
      };
    default:
      return state;
  }
}
