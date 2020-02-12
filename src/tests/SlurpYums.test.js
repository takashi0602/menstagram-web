import { getSlurpYums } from '../api/slurpYums';
import { requestRegister } from '../api/auth';

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
  params: {
    slurp_id: '1'
  }
};

it('request liker api', async () => {
  const registerRes = await requestRegister(registerData);
  typeNull.accessToken = registerRes.response.data.access_token;
  expect(registerRes.response.statusText).toEqual('OK');

  const slurpYumsRes = await getSlurpYums(typeNull);
  expect(slurpYumsRes.response.status).toEqual(200);
});
