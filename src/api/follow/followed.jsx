import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const getFollowed = request => {
  return axios({
    method: 'GET',
    url: `${baseUrl}/v1/user/followed`,
    headers: {
      Authorization: `Bearer ${request.accessToken}`
    },
    params: request.params
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};
