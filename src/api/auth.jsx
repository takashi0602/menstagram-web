import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL;

export const requestRegister = (request) => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/auth/register`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(request.payload)
  }).then(
    response => ({ response })
  ).catch(
    error => ({ error })
  );
};

export const requestLogin = (request) => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/auth/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(request.payload)
  }).then(
    response => ({ response })
  ).catch(
    error => ({ error })
  );
};

export const requestLogout = (accessToken) => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/auth/logout`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    data: {}
  }).then(
    response => ({ response })
  ).catch(
    error => ({ error })
  );
};
