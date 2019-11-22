const initialState = {
  loading: false
};

export function loading(state = initialState, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: action.loading
      };
    case 'NOT_LOADING':
      return {
        loading: action.loading
      };
    default:
      return state;
  }
}
