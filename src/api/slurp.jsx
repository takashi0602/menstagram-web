import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const requestSlurpImages = request => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/slurp`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${request.accessToken}`
    },
    data: request.payload.formData
  })
    .then(response => {
      for (let i = 0; i < response.data.is_ramens.length; i++) {
        if (!response.data.is_ramens[i]) return { response };
      }
      return request.payload.text === ''
        ? { response }
        : requestSlurpText(request, response.data.slurp_id, response.data);
    })
    .catch(error => ({ error }));
};

const requestSlurpText = (request, slurpId, slurpImageResponse) => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/slurp/text`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${request.accessToken}`
    },
    data: {
      slurp_id: slurpId,
      text: request.payload.text
    }
  })
    .then(response => {
      response.data.is_ramens = slurpImageResponse.is_ramens;
      return { response };
    })
    .catch(error => ({ error }));
};
