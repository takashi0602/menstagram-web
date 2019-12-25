const initialState = {
  postList: [],
  status: -1
};

export function globalTimeline(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESS_GLOBAL_TIMELINE':
      return {
        postList: action.postList,
        status: action.status
      };
    case 'FAIL_GLOBAL_TIMELINE':
      return {
        postList: action.postList,
        status: action.status
      };
    default:
      return state;
  }
}
