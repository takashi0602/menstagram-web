export const YUM = 'YUM';
export const SUCCESS_YUM = 'SUCCESS_YUM';
export const FAIL_YUM = 'FAIL_YUM';
export const UNYUM = 'UNYUM';
export const SUCCESS_UNYUM = 'SUCCESS_UNYUM';
export const FAIL_UNYUM = 'FAIL_UNYUM';

export const yum = payload => {
  return {
    type: YUM,
    accessToken: payload.accessToken,
    slurpId: payload.slurpId,
    success: false
  };
};

export const successYum = slurpId => {
  return {
    type: SUCCESS_YUM,
    slurpId: slurpId,
    success: true
  };
};

export const failYum = () => {
  return {
    type: FAIL_YUM,
    slurpId: -1,
    success: false
  };
};

export const unyum = payload => {
  return {
    type: UNYUM,
    accessToken: payload.accessToken,
    slurpId: payload.slurpId,
    success: false
  };
};

export const successUnyum = slurpId => {
  return {
    type: SUCCESS_UNYUM,
    slurpId: slurpId,
    success: true
  };
};

export const failUnyum = () => {
  return {
    type: FAIL_UNYUM,
    slurpId: -1,
    success: false
  };
};
