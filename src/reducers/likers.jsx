const initialState = {
  likerList: [],
  status: -1
};

export function likers(state = initialState, action) {
  switch (action.type) {
    case 'LIKERS':
      return state;
    case 'SUCCESS_LIKERS':
      return {
        likerList: action.likerList,
        status: action.status,
        postId: action.postId
      };
    case 'FAIL_LIKERS':
      return {
        likerList: action.likerList,
        status: action.status
      };
    default:
      return state;
  }
}
