import { getFollowers } from '../api/follow/followers';
import { getFollows } from '../api/follow/followees';
import { getSlurpDetail } from '../api/slurpdetail';
import { requestRegister } from '../api/auth';
import { follow, unfollow } from '../api/follow';

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
    user_name: random1,
    email: `${random1}@gmail.com`,
    password: random1
  }
};

const registerData2 = {
  payload: {
    user_id: random2,
    user_name: random2,
    email: `${random2}@gmail.com`,
    password: random2
  }
};

const slurpData = {
  accessToken: '',
  params: {
    slurp_id: 1
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

it('request follows api', async () => {
  const registerRes = await requestRegister(registerData1);
  slurpData.accessToken = registerRes.response.data.access_token;
  followData.accessToken = registerRes.response.data.access_token;
  expect(registerRes.response.statusText).toEqual('OK');

  const slurpDetailRes = await getSlurpDetail(slurpData);
  followData.payload.user_id = slurpDetailRes.response.data.user.user_id;
  expect(slurpDetailRes.response.status).toEqual(200);

  const followsRes = await getFollows(followData);
  expect(followsRes.response.status).toEqual(200);
});

it('request followers api', async () => {
  const followersRes = await getFollowers(followData);
  expect(followersRes.response.status).toEqual(200);
});

it('request follow api', async () => {
  const registerRes = await requestRegister(registerData2);
  followUnfollowData.accessToken = registerRes.response.data.access_token;

  const followRes = await follow(followUnfollowData);
  expect(followRes.response.status).toEqual(200);
});

it('request unfollow api', async () => {
  const unfollowRes = await unfollow(followUnfollowData);
  expect(unfollowRes.response.status).toEqual(200);
});
