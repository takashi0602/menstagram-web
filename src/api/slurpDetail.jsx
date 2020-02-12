import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const getSlurpDetail = request => {
  return axios({
    method: 'GET',
    url: `${baseUrl}/v1/slurp/detail`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${request.accessToken}`
    },
    params: request.params
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};
