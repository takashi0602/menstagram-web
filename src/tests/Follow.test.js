import { getFollowed } from '../api/follow/followed';
import { getFollowing } from '../api/follow/following';
import { requestPostDetail } from '../api/postDetail';
import { requestRegister } from '../api/auth';

jest.setTimeout(10000);

const random = Math.random()
  .toString(36)
  .slice(-8);

const registerData = {
  payload: {
    user_id: random,
    screen_name: random,
    email: `${random}@gmail.com`,
    password: random
  }
};

const postData = {
  accessToken: '',
  params: {
    post_id: 1
  }
};

const followData = {
  accessToken: '',
  payload: {
    user_id: ''
  }
};

it('request following api', async () => {
  const registerRes = await requestRegister(registerData);
  postData.accessToken = registerRes.response.data.access_token;
  followData.accessToken = registerRes.response.data.access_token;
  expect(registerRes.response.statusText).toEqual('OK');

  const postDetailRes = await requestPostDetail(postData);
  followData.payload.user_id = postDetailRes.response.data.user.user_id;
  expect(postDetailRes.response.status).toEqual(200);

  const followingRes = await getFollowing(followData);
  expect(followingRes.response.status).toEqual(200);
});

it('request followed api', async () => {
  const followedRes = await getFollowed(followData);
  expect(followedRes.response.status).toEqual(200);
});
