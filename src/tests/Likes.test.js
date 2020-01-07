import { getLikes } from '../api/likes';
import { requestRegister } from '../api/auth';
import { postLikePost, postNotLikePost } from '../api/likePost';

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

const typeNull = {
  accessToken: '',
  params: {}
};

const typeNew = {
  accessToken: '',
  params: {
    post_id: '1',
    type: 'new'
  }
};

const typeOld = {
  accessToken: '',
  params: {
    post_id: '1',
    type: 'old'
  }
};

const likedPost = {
  accessToken: '',
  postId: '1'
};

it('request likes api, request likePost api', async () => {
  const registerRes = await requestRegister(registerData);
  typeNull.accessToken = registerRes.response.data.access_token;
  typeNew.accessToken = registerRes.response.data.access_token;
  typeOld.accessToken = registerRes.response.data.access_token;
  likedPost.accessToken = registerRes.response.data.access_token;
  expect(registerRes.response.statusText).toEqual('OK');

  const likedPostRes = await postLikePost(likedPost);
  expect(likedPostRes.response.statusText).toEqual('OK');

  const likesRes = await getLikes(typeNull);
  expect(likesRes.response.statusText).toEqual('OK');
});

it('request likes api type new', async () => {
  const likesRes = await getLikes(typeNew);
  expect(likesRes.response.statusText).toEqual('OK');
});

it('request likes api type old, request notLikePost api', async () => {
  const likesRes = await getLikes(typeOld);
  expect(likesRes.response.statusText).toEqual('OK');

  const likedPostRes = await postNotLikePost(likedPost);
  expect(likedPostRes.response.statusText).toEqual('OK');
});
