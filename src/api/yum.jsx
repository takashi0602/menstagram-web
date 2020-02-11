import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const yum = request => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/slurp/yum`,
    headers: {
      Authorization: `Bearer ${request.accessToken}`
    },
    data: {
      slurp_id: request.slurpId
    }
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

export const unyum = request => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/slurp/unyum`,
    headers: {
      Authorization: `Bearer ${request.accessToken}`
    },
    data: {
      slurp_id: request.slurpId
    }
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};
