const initialState = {
  accessToken: null,
  status: null
};

export function register(state = initialState, action) {
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
    default:
      return initialState;
  }
}

export function login(state = initialState, action) {
  switch (action.type) {
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
    default:
      return initialState;
  }
}
