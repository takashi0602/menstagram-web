const initialState = {
  postId: -1,
  success: false
};

export function likePost(state = initialState, action) {
  switch (action.type) {
    case 'LIKE_POST':
      return state;
    case 'SUCCESS_LIKE_POST':
      return {
        postId: action.postId,
        success: action.success
      };
    case 'FAIL_LIKE_POST':
      return {
        postId: action.postId,
        success: action.success
      };
    case 'NOT_LIKE_POST':
      return state;
    case 'SUCCESS_NOT_LIKE_POST':
      return {
        postId: action.postId,
        success: action.success
      };
    case 'FAIL_NOT_LIKE_POST':
      return {
        postId: action.postId,
        success: action.success
      };
    default:
      return state;
  }
}
