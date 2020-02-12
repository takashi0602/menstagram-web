const initialState = {
  status: -1,
  slurpDetail: {
    id: undefined,
    text: '',
    images: [],
    yum_count: 0,
    is_yum: undefined,
    user: {},
    yums: [],
    created_at: '',
    updated_at: ''
  }
};

export function slurpDetail(state = initialState, action) {
  switch (action.type) {
    case 'SLURP_DETAIL':
      return {
        status: action.status,
        slurpDetail: state.slurpDetail
      };
    case 'SUCCESS_SLURP_DETAIL':
      return {
        status: action.status,
        slurpDetail: action.slurpDetail
      };
    case 'FAIL_SLURP_DETAIL':
      return {
        status: action.status,
        slurpDetail: action.slurpDetail
      };
    default:
      return state;
  }
}
