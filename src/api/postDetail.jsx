import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const requestPostDetail = request => {
  return axios({
    method: 'GET',
    url: `${baseUrl}/v1/post/detail`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${request.accessToken}`
    },
    params: request.payload
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};
