const initialState = {
  accessToken: null,
  userId: ''
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER':
      return state;
    case 'SUCCESS_REGISTER':
      return {
        accessToken: action.accessToken,
        userId: action.userId
      };
    case 'FAIL_REGISTER':
      return {
        accessToken: action.accessToken,
        userId: action.userId
      };
    case 'LOGIN':
      return state;
    case 'SUCCESS_LOGIN':
      return {
        accessToken: action.accessToken,
        userId: action.userId
      };
    case 'FAIL_LOGIN':
      return {
        accessToken: action.accessToken,
        userId: action.userId
      };
    case 'LOGOUT':
      return state;
    case 'SUCCESS_LOGOUT':
      return {
        accessToken: action.accessToken,
        userId: action.userId
      };
    case 'FAIL_LOGOUT':
      return {
        accessToken: action.accessToken,
        userId: action.userId
      };
    default:
      return state;
  }
}
