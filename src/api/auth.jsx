import axios from 'axios'

export const requestRegister = (request) => {
  console.log(JSON.stringify(request.payload));
  return axios.post(
    `${process.env.REACT_APP_API_URL}/v1/auth/register`,
    {
      data: JSON.stringify(request.payload)
    }
  );
};
