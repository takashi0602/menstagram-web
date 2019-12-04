const initialState = {
  status: null
};

export function error(state = initialState, action) {
  switch (action.type) {
    case 'ERROR':
      return {
        status: action.status
      };
    case 'NOT_ERROR':
      return {
        status: action.status
      };
    default:
      return state;
  }
}
