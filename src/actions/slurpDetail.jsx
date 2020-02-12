export const SLURP_DETAIL = 'SLURP_DETAIL';
export const SUCCESS_SLURP_DETAIL = 'SUCCESS_SLURP_DETAIL';
export const FAIL_SLURP_DETAIL = 'FAIL_SLURP_DETAIL';

export const slurpDetail = payload => {
  return {
    type: SLURP_DETAIL,
    accessToken: payload.accessToken,
    params: payload.params,
    status: 200
  };
};

export const successSlurpDetail = response => {
  return {
    type: SUCCESS_SLURP_DETAIL,
    status: response.status,
    slurpDetail: response.data
  };
};

export const failSlurpDetail = status => {
  return {
    type: FAIL_SLURP_DETAIL,
    status: status,
    slurpDetail: {}
  };
};
