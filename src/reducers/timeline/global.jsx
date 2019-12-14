const initialState = {
  postList: []
};

export function globalTimeline(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESS_GLOBAL_TIMELINE':
      return {
        postList: action.postList
      };
    case 'FAIL_GLOBAL_TIMELINE':
      return {
        postList: action.postList
      };
    default:
      return state;
  }
}
