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

it('request yum api, request yums api', async () => {
  const registerRes = await requestRegister(registerData);
  typeNull.accessToken = registerRes.response.data.access_token;
  typeNew.accessToken = registerRes.response.data.access_token;
  typeOld.accessToken = registerRes.response.data.access_token;
  yumSlurp.accessToken = registerRes.response.data.access_token;
  expect(registerRes.response.statusText).toEqual('OK');

  const yumRes = await yum(yumSlurp);
  expect(yumRes.response.statusText).toEqual('OK');

  const yumsRes = await getYums(typeNull);
  expect(yumsRes.response.statusText).toEqual('OK');
});

it('request yums api type new', async () => {
  const yumsRes = await getYums(typeNew);
  expect(yumsRes.response.statusText).toEqual('OK');
});

it('request yums api type old, request unyum api', async () => {
  const yumsRes = await getYums(typeOld);
  expect(yumsRes.response.statusText).toEqual('OK');

  const unyumRes = await unyum(yumSlurp);
  expect(unyumRes.response.statusText).toEqual('OK');
});
