const initialState = {
  success: false,
  isRamens: []
};

export function post(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESS_POST':
      return {
        success: action.success,
        isRamens: action.isRamens
      };
    case 'FAIL_POST':
      return {
        success: action.success,
        isRamens: action.isRamens
      };
    default:
      return state;
  }
}
