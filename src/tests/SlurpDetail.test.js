import { getSlurpDetail } from '../api/slurpDetail';
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

it('request slurpDetail api', () => {
  return requestRegister(registerData).then(registerRes => {
    typeNull.accessToken = registerRes.response.data.access_token;
    expect(registerRes.response.statusText).toEqual('OK');
    return getSlurpDetail(typeNull).then(slurpDetailRes => {
      expect(slurpDetailRes.response.statusText).toEqual('OK');
    });
  });
});
