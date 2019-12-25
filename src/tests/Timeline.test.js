import { getTimeline } from '../api/timeline';
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

const privateTypeNull = {
  accessToken: '',
  pathName: 'private',
  params: {}
};

const privateTypeNew = {
  accessToken: '',
  pathName: 'private',
  params: {
    post_id: '1',
    type: 'new'
  }
};

const privateTypeOld = {
  accessToken: '',
  pathName: 'private',
  params: {
    post_id: '10',
    type: 'old'
  }
};

const globalTypeNull = {
  accessToken: '',
  pathName: 'global',
  params: {}
};

const globalTypeNew = {
  accessToken: '',
  pathName: 'global',
  params: {
    post_id: '1',
    type: 'new'
  }
};

const globalTypeOld = {
  accessToken: '',
  pathName: 'global',
  params: {
    post_id: '10',
    type: 'old'
  }
};

it('request private timeline api', () => {
  return requestRegister(registerData).then(registerRes => {
    privateTypeNull.accessToken = registerRes.response.data.access_token;
    expect(registerRes.response.statusText).toEqual('OK');
    return getTimeline(privateTypeNull).then(timelineRes => {
      expect(timelineRes.response.statusText).toEqual('OK');
    });
  });
});

it('request private timeline api type new', () => {
  return requestLogin(loginData).then(loginRes => {
    privateTypeNew.accessToken = loginRes.response.data.access_token;
    expect(loginRes.response.statusText).toEqual('OK');
    return getTimeline(privateTypeNew).then(timelineRes => {
      expect(timelineRes.response.statusText).toEqual('OK');
    });
  });
});

it('request private timeline api type old', () => {
  return requestLogin(loginData).then(loginRes => {
    privateTypeOld.accessToken = loginRes.response.data.access_token;
    expect(loginRes.response.statusText).toEqual('OK');
    return getTimeline(privateTypeOld).then(timelineRes => {
      expect(timelineRes.response.statusText).toEqual('OK');
    });
  });
});

it('request global timeline api', () => {
  return requestLogin(loginData).then(loginRes => {
    globalTypeNull.accessToken = loginRes.response.data.access_token;
    expect(loginRes.response.statusText).toEqual('OK');
    return getTimeline(globalTypeNull).then(timelineRes => {
      expect(timelineRes.response.statusText).toEqual('OK');
    });
  });
});

it('request global timeline api type new', () => {
  return requestLogin(loginData).then(loginRes => {
    globalTypeNew.accessToken = loginRes.response.data.access_token;
    expect(loginRes.response.statusText).toEqual('OK');
    return getTimeline(globalTypeNew).then(timelineRes => {
      expect(timelineRes.response.statusText).toEqual('OK');
    });
  });
});

it('request global timeline api type old', () => {
  return requestLogin(loginData).then(loginRes => {
    globalTypeOld.accessToken = loginRes.response.data.access_token;
    expect(loginRes.response.statusText).toEqual('OK');
    return getTimeline(globalTypeOld).then(timelineRes => {
      expect(timelineRes.response.statusText).toEqual('OK');
    });
  });
});
