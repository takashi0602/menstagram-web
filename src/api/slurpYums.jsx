import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const getslurpYums = request => {
  return axios({
    method: 'GET',
    url: `${baseUrl}/v1/slurp/yums`,
    headers: {
      Authorization: `Bearer ${request.accessToken}`
    },
    params: request.params
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};
