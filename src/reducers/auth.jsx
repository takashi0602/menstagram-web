const initialState = {
  accessToken: null,
  status: null
};

export default function register(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER':
      state.accessToken = null;
      state.status = null;
      return state;
    case 'SUCCESS_REGISTER':
      state.accessToken = action.accessToken;
      state.status = action.status;
      return state;
    case 'FAIL_REGISTER':
      state.accessToken = action.accessToken;
      state.status = action.status;
      return state;
    default:
      return initialState;
  }
}
