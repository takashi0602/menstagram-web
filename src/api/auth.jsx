import axios from 'axios'

export const requestRegister = (request) => {
  return axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/v1/auth/register`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(request.payload)
  }).then(response => ({ response }))
    .catch(error => ({ error }));
};
