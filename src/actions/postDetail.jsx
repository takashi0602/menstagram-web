export const POST_DETAIL = 'POST_DETAIL';
export const SUCCESS_POST_DETAIL = 'SUCCESS_POST_DETAIL';
export const FAIL_POST_DETAIL = 'FAIL_POST_DETAIL';

export const postDetail = payload => {
  return {
    type: POST_DETAIL,
    accessToken: payload.accessToken,
    payload: payload.params,
    status: -1,
    postDetail: payload.postDetail
  };
};

export const successPostDetail = response => {
  return {
    type: SUCCESS_POST_DETAIL,
    status: response.status,
    postDetail: response.data
  };
};

export const failPostDetail = status => {
  return {
    type: FAIL_POST_DETAIL,
    status: status,
    postDetail: {}
  };
};
