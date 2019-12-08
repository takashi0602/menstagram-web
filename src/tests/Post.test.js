import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store } from '../store';
import { history } from '../history';
import { act } from 'react-dom/test-utils';
import { Post } from '../containers/post';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

jest.setTimeout(10000);

it('can render post', () => {
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
});
