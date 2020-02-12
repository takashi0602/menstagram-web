import { getSlurpDetail } from '../api/slurp/detail';
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
    slurp_id: 1
  }
};

it('request likes api', () => {
  return requestRegister(registerData).then(registerRes => {
    typeNull.accessToken = registerRes.response.data.access_token;
    expect(registerRes.response.statusText).toEqual('OK');
    return getSlurpDetail(typeNull).then(postDetailRes => {
      expect(postDetailRes.response.statusText).toEqual('OK');
    });
  });
});
