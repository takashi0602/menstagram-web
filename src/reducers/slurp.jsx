const initialState = {
  success: false,
  isRamens: []
};

export function slurp(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESS_SLURP':
      return {
        success: action.success,
        isRamens: action.isRamens
      };
    case 'FAIL_SLURP':
      return {
        success: action.success,
        isRamens: action.isRamens
      };
    default:
      return state;
  }
}
