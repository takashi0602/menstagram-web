import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './history';
import { store } from './store/index';
import { Top } from './containers/top';
import { Register } from "./containers/register";
import { Login } from "./containers/login";
import { Notification } from "./containers/notification";

export const Routes = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className='c-container'>
          <Switch>
            <Route exact path={'/'} component={ Top } />
            <Route exact path={'/register'} component={ Register } />
            <Route exact path={'/login'} component={ Login } />
            <Route exact path={'/notification'} component={ Notification }/>
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};
