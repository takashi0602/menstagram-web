const initialState = {
  status: null,
  errors: {}
};

export function error(state = initialState, action) {
  switch (action.type) {
    case 'ERROR':
      return {
        status: action.status,
        errors: action.errors
      };
    case 'NOT_ERROR':
      return {
        status: action.status,
        errors: action.errors
      };
    default:
      return state;
  }
}
