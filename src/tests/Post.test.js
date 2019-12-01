import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store } from '../store';
import { history } from '../history';
import { act } from 'react-dom/test-utils';
import { Post } from '../containers/post';
import { requestRegister } from '../api/auth';
import { requestPostImages } from "../api/post";
import titleSvg from '../assets/images/title.svg';

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

const formData = new FormData();
formData.append('image1', titleSvg);

const postImages = {
  payload: {
    formData,
    text: "テスト"
  }
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

jest.setTimeout(10000);

it('can render post, request post api', () => {
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Post />
        </ConnectedRouter>
      </Provider>,
      container
    );
  });

  const button = container.querySelector('button');
  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  const errorMsg = container.querySelectorAll('.text-danger');
  expect(errorMsg.length).toEqual(1);

  return requestRegister(registerData).then(res => {
    accessToken = res.response.data.access_token;
    expect(res.response.statusText).toEqual('OK');
    postImages.accessToken = accessToken;
    requestPostImages(postImages).then(res => {
      expect(res.response.statusText).toEqual('OK');
    });
  });
});
