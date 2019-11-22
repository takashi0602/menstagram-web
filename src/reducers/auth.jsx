const initialState = {
  accessToken: null,
  status: null
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER':
      return state;
    case 'SUCCESS_REGISTER':
      return {
        accessToken: action.accessToken,
        status: action.status
      };
    case 'FAIL_REGISTER':
      return {
        accessToken: action.accessToken,
        status: action.status
      };
    case 'LOGIN':
      return state;
    case 'SUCCESS_LOGIN':
      return {
        accessToken: action.accessToken,
        status: action.status
      };
    case 'FAIL_LOGIN':
      return {
        accessToken: action.accessToken,
        status: action.status
      };
    case 'LOGOUT':
      return state;
    case 'SUCCESS_LOGOUT':
      return {
        accessToken: action.accessToken,
        status: action.status
      };
    case 'FAIL_LOGOUT':
      return {
        accessToken: action.accessToken,
        status: action.status
      };
    default:
      return state;
  }
}
