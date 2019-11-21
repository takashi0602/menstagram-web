import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store } from '../store';
import { history } from '../history';
import { act } from 'react-dom/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { Register } from '../containers/register';
import { Login } from '../containers/Login';
import { Logout } from '../containers/Logout';
import { Form } from '../components/form';
import { requestRegister, requestLogin, requestLogout } from '../api/auth';

let container, accessToken;

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

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

jest.setTimeout(10000);

it('can render register, request register api', () => {
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Register />
        </ConnectedRouter>
      </Provider>,
      container
    );
  });

  const post = payload => {
    expect(payload.user_id).toEqual(random);
    expect(payload.screen_name).toEqual(random);
    expect(payload.email).toEqual(`${random}@gmail.com`);
    expect(payload.password).toEqual(random);
  };

  const wrapper = shallow(
    <Form formName="register" post={payload => post(payload)} status={null} />
  );
  wrapper.setState({ userId: random });
  wrapper.setState({ userName: random });
  wrapper.setState({ email: `${random}@gmail.com` });
  wrapper.setState({ password: random });
  wrapper.find('button').simulate('click');

  return requestRegister(registerData).then(res => {
    accessToken = res.response.data.access_token;
    expect(res.response.statusText).toEqual('OK');
  });
});

it('can render logout, request logout api', () => {
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Logout />
        </ConnectedRouter>
      </Provider>,
      container
    );
  });

  return requestLogout(accessToken).then(res =>
    expect(res.response.statusText).toEqual('OK')
  );
});

it('can render login, request login api', () => {
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Login />
        </ConnectedRouter>
      </Provider>,
      container
    );
  });

  const post = payload => {
    expect(payload.user_id).toEqual(random);
    expect(payload.password).toEqual(random);
  };

  const wrapper = shallow(
    <Form formName="login" post={payload => post(payload)} status={null} />
  );
  wrapper.setState({ userId: random });
  wrapper.setState({ password: random });
  wrapper.find('button').simulate('click');

  return requestLogin(loginData).then(res =>
    expect(res.response.statusText).toEqual('OK')
  );
});
