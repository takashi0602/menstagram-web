import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const requestPostImages = request => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/post`,
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
        : requestPostText(request, response.data.post_id, response.data);
    })
    .catch(error => ({ error }));
};

const requestPostText = (request, postId, postImageResponse) => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/post/text`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${request.accessToken}`
    },
    data: {
      post_id: postId,
      text: request.payload.text
    }
  })
    .then(response => {
      response.data.is_ramens = postImageResponse.is_ramens;
      return { response };
    })
    .catch(error => ({ error }));
};
