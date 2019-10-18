import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './history';
import { store } from './store/index';
import { Top } from './containers/top/index';

export const Routes = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={'/'} component={Top} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};
