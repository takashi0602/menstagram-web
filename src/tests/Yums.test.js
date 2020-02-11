import { getYums } from '../api/yums';
import { requestRegister } from '../api/auth';
import { yum, unyum } from '../api/yum';

jest.setTimeout(10000);

const random = Math.random()
  .toString(36)
  .slice(-8);

const registerData = {
  payload: {
    user_id: random,
    user_name: random,
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
    slurp_id: '1',
    type: 'new'
  }
};

const typeOld = {
  accessToken: '',
  params: {
    slurp_id: '1',
    type: 'old'
  }
};

const yumSlurp = {
  accessToken: '',
  slurpId: '1'
};

it('request likes api, request likePost api', async () => {
  const registerRes = await requestRegister(registerData);
  typeNull.accessToken = registerRes.response.data.access_token;
  typeNew.accessToken = registerRes.response.data.access_token;
  typeOld.accessToken = registerRes.response.data.access_token;
  yumSlurp.accessToken = registerRes.response.data.access_token;
  expect(registerRes.response.statusText).toEqual('OK');

  const likedPostRes = await yum(yumSlurp);
  expect(likedPostRes.response.statusText).toEqual('OK');

  const likesRes = await getYums(typeNull);
  expect(likesRes.response.statusText).toEqual('OK');
});

it('request likes api type new', async () => {
  const likesRes = await getYums(typeNew);
  expect(likesRes.response.statusText).toEqual('OK');
});

it('request likes api type old, request notLikePost api', async () => {
  const likesRes = await getYums(typeOld);
  expect(likesRes.response.statusText).toEqual('OK');

  const likedPostRes = await unyum(yumSlurp);
  expect(likedPostRes.response.statusText).toEqual('OK');
});
