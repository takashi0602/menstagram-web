const initialState = {
  postList: [],
  status: -1
};

export function likes(state = initialState, action) {
  switch (action.type) {
    case 'LIKES':
      return {
        postList: action.postList,
        status: action.status
      };
    case 'SUCCESS_LIKES':
      return {
        postList: action.postList,
        status: action.status
      };
    case 'FAIL_LIKES':
      return {
        postList: action.postList,
        status: action.status
      };
    default:
      return state;
  }
}
