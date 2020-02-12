import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const follow = request => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/user/follow`,
    headers: {
      Authorization: `Bearer ${request.accessToken}`
    },
    data: {
      target_user_id: request.targetUserId
    }
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

export const unfollow = request => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/v1/user/unfollow`,
    headers: {
      Authorization: `Bearer ${request.accessToken}`
    },
    data: {
      target_user_id: request.targetUserId
    }
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};
