import { requestPostDetail } from '../api/slurpDetail';
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
  payload: {
    post_id: 1
  }
};

it('request likes api', () => {
  return requestRegister(registerData).then(registerRes => {
    typeNull.accessToken = registerRes.response.data.access_token;
    expect(registerRes.response.statusText).toEqual('OK');
    return requestPostDetail(typeNull).then(postDetailRes => {
      expect(postDetailRes.response.statusText).toEqual('OK');
    });
  });
});
