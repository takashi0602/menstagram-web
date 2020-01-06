import { getLikes } from '../api/likes';
import { requestLogin, requestRegister } from '../api/auth';

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

const loginData = {
  payload: {
    user_id: random,
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
    post_id: '10',
    type: 'old'
  }
};

it('request likes api', () => {
  return requestRegister(registerData).then(registerRes => {
    typeNull.accessToken = registerRes.response.data.access_token;
    expect(registerRes.response.statusText).toEqual('OK');
    return getLikes(typeNull).then(likesRes => {
      expect(likesRes.response.statusText).toEqual('OK');
    });
  });
});

it('request likes api type new', () => {
  return requestLogin(loginData).then(loginRes => {
    typeNew.accessToken = loginRes.response.data.access_token;
    expect(loginRes.response.statusText).toEqual('OK');
    return getLikes(typeNew).then(likesRes => {
      expect(likesRes.response.statusText).toEqual('OK');
    });
  });
});

it('request likes api type old', () => {
  return requestLogin(loginData).then(loginRes => {
    typeOld.accessToken = loginRes.response.data.access_token;
    expect(loginRes.response.statusText).toEqual('OK');
    return getLikes(typeOld).then(likesRes => {
      expect(likesRes.response.statusText).toEqual('OK');
    });
  });
});
