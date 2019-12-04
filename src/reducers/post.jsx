export function post(state = {}, action) {
  switch (action.type) {
    case 'SUCCESS_POST':
      return state;
    case 'FAIL_POST':
      return state;
    default:
      return state;
  }
}
