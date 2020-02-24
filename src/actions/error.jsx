export const ERROR = 'ERROR';
export const NOT_ERROR = 'NOT_ERROR';

export const error = error => {
  return {
    type: ERROR,
    status: error ? error.status : 500,
    errors: error ? error.data.errors : {}
  };
};

export const notError = () => {
  return {
    type: NOT_ERROR,
    status: null,
    errors: {}
  };
};
