import { patchProfileEdit } from '../api/profileEdit';
import { requestRegister } from '../api/auth';
import { getProfile } from '../api/profile';

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

const data = {
  accessToken: '',
  profile: {
    screenName: `new${random}`,
    biography: `edit profile`
  },
  params: {
    user_id: random
  }
};

it('patch profile', async () => {
  const registerRes = await requestRegister(registerData);
  data.accessToken = registerRes.response.data.access_token;
  expect(registerRes.response.statusText).toEqual('OK');

  const profileEditRes = await patchProfileEdit(data);
  expect(profileEditRes.response.statusText).toEqual('OK');

  const profileRes = await getProfile(data);
  expect(profileRes.response.data.biography).toEqual('edit profile');
});
