export const YUMS = 'YUMS';
export const SUCCESS_YUMS = 'SUCCESS_YUMS';
export const FAIL_YUMS = 'FAIL_YUMS';

export const yums = payload => {
  return {
    type: YUMS,
    accessToken: payload.accessToken,
    params: payload.params,
    slurpList: payload.slurpList,
    status: 200
  };
};

export const successYums = response => {
  return {
    type: SUCCESS_YUMS,
    slurpList: response.data,
    status: response.status
  };
};

export const failYums = status => {
  return {
    type: FAIL_YUMS,
    slurpList: [],
    status: status
  };
};
