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

export const successPrivateTimeline = response => {
  return {
    type: SUCCESS_PRIVATE_TIMELINE,
    postList: response.data,
    status: response.status
  };
};

export const failPrivateTimeline = error => {
  return {
    type: FAIL_PRIVATE_TIMELINE,
    postList: [],
    status: error.status
  };
};
