import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const postLikePost = request => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/post/like`,
    headers: {
      Authorization: `Bearer ${request.accessToken}`
    },
    data: {
      post_id: request.postId
    }
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

export const postNotLikePost = request => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/post/unlike`,
    headers: {
      Authorization: `Bearer ${request.accessToken}`
    },
    data: {
      post_id: request.postId
    }
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};
