export const SLURP = 'SLURP';
export const SUCCESS_SLURP = 'SUCCESS_SLURP';
export const FAIL_SLURP = 'FAIL_SLURP';

export const slurp = (payload, accessToken) => {
  return {
    type: SLURP,
    accessToken: accessToken,
    payload: payload,
    success: false
  };
};

export const successSlurp = () => {
  return {
    type: SUCCESS_SLURP,
    success: true,
    isRamens: []
  };
};

export const failSlurp = isRamens => {
  return {
    type: FAIL_SLURP,
    success: false,
    isRamens: isRamens
  };
};
