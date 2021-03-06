export const GLOBAL_TIMELINE = 'GLOBAL_TIMELINE';
export const SUCCESS_GLOBAL_TIMELINE = 'SUCCESS_GLOBAL_TIMELINE';
export const FAIL_GLOBAL_TIMELINE = 'FAIL_GLOBAL_TIMELINE';

export const globalTimeline = payload => {
  return {
    type: GLOBAL_TIMELINE,
    accessToken: payload.accessToken,
    params: payload.params,
    pathName: payload.pathName,
    postList: payload.postList,
    status: 200
  };
};

export const successGlobalTimeline = response => {
  return {
    type: SUCCESS_GLOBAL_TIMELINE,
    postList: response.data,
    status: response.status
  };
};

export const failGlobalTimeline = status => {
  return {
    type: FAIL_GLOBAL_TIMELINE,
    postList: [],
    status: status
  };
};
