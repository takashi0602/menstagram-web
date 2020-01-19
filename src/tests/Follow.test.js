import { getFollowed } from '../api/follow/followed';
import { getFollowing } from '../api/follow/following';
import { requestPostDetail } from '../api/postDetail';
import { requestRegister } from '../api/auth';
import { postFollow, postUnfollow } from '../api/follow';

jest.setTimeout(10000);

const random1 = Math.random()
  .toString(36)
  .slice(-8);

const random2 = Math.random()
  .toString(36)
  .slice(-8);

const registerData1 = {
  payload: {
    user_id: random1,
    screen_name: random1,
    email: `${random1}@gmail.com`,
    password: random1
  }
};

const registerData2 = {
  payload: {
    user_id: random2,
    screen_name: random2,
    email: `${random2}@gmail.com`,
    password: random2
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

const followUnfollowData = {
  accessToken: '',
  targetUserId: random1
};

it('request following api', async () => {
  const registerRes = await requestRegister(registerData1);
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

it('request follow api', async () => {
  const registerRes = await requestRegister(registerData2);
  followUnfollowData.accessToken = registerRes.response.data.access_token;

  const followRes = await postFollow(followUnfollowData);
  expect(followRes.response.status).toEqual(200);
});

it('request unfollow api', async () => {
  const unfollowRes = await postUnfollow(followUnfollowData);
  expect(unfollowRes.response.status).toEqual(200);
});
