import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const getProfileSlurps = request => {
  return axios({
    method: 'GET',
    url: `${baseUrl}/v1/user/slurps`,
    headers: {
      Authorization: `Bearer ${request.accessToken}`
    },
    params: request.params
  })
    .then(slurpsResponse => ({ slurpsResponse }))
    .catch(slurpsError => ({ slurpsError }));
};
