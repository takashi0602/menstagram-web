import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { Top } from '../containers/top'

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
    ReactDOM.render(<BrowserRouter><Top /></BrowserRouter>, container);
  });
});
