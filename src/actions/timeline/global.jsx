export const GLOBAL_TIMELINE = 'GLOBAL_TIMELINE';
export const SUCCESS_GLOBAL_TIMELINE = 'SUCCESS_GLOBAL_TIMELINE';
export const FAIL_GLOBAL_TIMELINE = 'FAIL_GLOBAL_TIMELINE';

export const globalTimeline = payload => {
  return {
    type: GLOBAL_TIMELINE,
    accessToken: payload.accessToken,
    params: payload.params,
    pathName: payload.pathName,
    postList: []
  };
};

export const successGlobalTimeline = postList => {
  return {
    type: SUCCESS_GLOBAL_TIMELINE,
    postList: postList
  };
};

export const failGlobalTimeline = () => {
  return {
    type: FAIL_GLOBAL_TIMELINE,
    postList: []
  };
};
