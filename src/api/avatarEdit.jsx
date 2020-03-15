import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const editAvatar = request => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/user/edit/avatar`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${request.accessToken}`
    },
    data: request.formData
  })
    .then(avatarEditResponse => ({ avatarEditResponse }))
    .catch(avatarEditError => ({ avatarEditError }));
};
