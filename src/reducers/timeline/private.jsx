const initialState = {
  postList: []
};

export function privateTimeline(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESS_PRIVATE_TIMELINE':
      return {
        postList: action.postList
      };
    case 'FAIL_PRIVATE_TIMELINE':
      return {
        postList: action.postList
      };
    default:
      return state;
  }
}
