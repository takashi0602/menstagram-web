const initialState = {
  status: -1,
  postDetail: {
    id: undefined,
    text: '',
    images: [],
    liked: undefined,
    user: {
      user_id: '',
      screen_name: '',
      avatar: ''
    },
    created_at: '',
    updated_at: '',
    liker: []
  }
};

export function postDetail(state = initialState, action) {
  switch (action.type) {
    case 'POST_DETAIL':
      return {
        status: action.status,
        postDetail: state.postDetail
      };
    case 'SUCCESS_POST_DETAIL':
      return {
        status: action.status,
        postDetail: action.postDetail
      };
    case 'FAIL_POST_DETAIL':
      return {
        status: action.status,
        postDetail: action.postDetail
      };
    default:
      return state;
  }
}
