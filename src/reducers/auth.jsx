const initialState = {
  accessToken: null
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER':
      return state;
    case 'SUCCESS_REGISTER':
      return {
        accessToken: action.accessToken
      };
    case 'FAIL_REGISTER':
      return {
        accessToken: action.accessToken
      };
    case 'LOGIN':
      return state;
    case 'SUCCESS_LOGIN':
      return {
        accessToken: action.accessToken
      };
    case 'FAIL_LOGIN':
      return {
        accessToken: action.accessToken
      };
    case 'LOGOUT':
      return state;
    case 'SUCCESS_LOGOUT':
      return {
        accessToken: action.accessToken
      };
    case 'FAIL_LOGOUT':
      return {
        accessToken: action.accessToken
      };
    default:
      return state;
  }
}
