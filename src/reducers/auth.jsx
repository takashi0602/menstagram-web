const initialState = {
  accessToken: null,
  status: null
};

export default function register(state = initialState, action) {
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
