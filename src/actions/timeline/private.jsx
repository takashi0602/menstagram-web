export const PRIVATE_TIMELINE = 'PRIVATE_TIMELINE';
export const SUCCESS_PRIVATE_TIMELINE = 'SUCCESS_PRIVATE_TIMELINE';
export const FAIL_PRIVATE_TIMELINE = 'FAIL_PRIVATE_TIMELINE';

export const privateTimeline = payload => {
  return {
    type: PRIVATE_TIMELINE,
    accessToken: payload.accessToken,
    params: payload.params,
    pathName: payload.pathName,
    postList: []
  };
};

export const successPrivateTimeline = postList => {
  return {
    type: SUCCESS_PRIVATE_TIMELINE,
    postList: postList
  };
};

export const failPrivateTimeline = () => {
  return {
    type: FAIL_PRIVATE_TIMELINE,
    postList: []
  };
};
