const initialState = {
  postList: [],
  status: -1
};

export function privateTimeline(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESS_PRIVATE_TIMELINE':
      return {
        postList: action.postList,
        status: action.status
      };
    case 'FAIL_PRIVATE_TIMELINE':
      return {
        postList: action.postList,
        status: action.status
      };
    default:
      return state;
  }
}
