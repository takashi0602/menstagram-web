import { getLikers } from '../api/likers';
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

const typeNull = {
  accessToken: '',
  params: {
    post_id: '1'
  }
};

it('request liker api', async () => {
  const registerRes = await requestRegister(registerData);
  typeNull.accessToken = registerRes.response.data.access_token;
  expect(registerRes.response.statusText).toEqual('OK');

  const likersRes = await getLikers(typeNull);
  expect(likersRes.response.status).toEqual(200);
});
