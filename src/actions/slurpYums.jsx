export const SLURP_YUMS = 'SLURP_YUMS';
export const SUCCESS_SLURP_YUMS = 'SUCCESS_SLURP_YUMS';
export const FAIL_SLURP_YUMS = 'FAIL_SLURP_YUMS';

export const slurpYums = payload => {
  return {
    type: SLURP_YUMS,
    accessToken: payload.accessToken,
    params: payload.params,
    slurpYums: [],
    status: 200,
    slurpId: payload.params.slurp_id
  };
};

export const successSlurpYums = (response, slurpId) => {
  return {
    type: SUCCESS_SLURP_YUMS,
    slurpYums: response.data,
    status: response.status,
    slurpId: slurpId
  };
};

export const failSlurpYums = status => {
  return {
    type: FAIL_SLURP_YUMS,
    slurpYums: [],
    status: status
  };
};
