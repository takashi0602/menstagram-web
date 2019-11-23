export const LOADING = 'LOADING';
export const NOT_LOADING = 'NOT_LOADING';

export const loading = () => {
  return {
    type: LOADING,
    loading: true
  };
};

export const notLoading = () => {
  return {
    type: NOT_LOADING,
    loading: false
  };
};
