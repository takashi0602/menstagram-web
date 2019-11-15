import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { act } from 'react-dom/test-utils';
import { Top } from '../containers/top'
import { store } from "../store";
import { history } from '../history';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render top', () => {
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Top />
        </ConnectedRouter>
      </Provider>,
      container
    );
  });
});
