import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react'
import { history } from './history';
import { store, persistor } from './store/index';
import { Auth, NoAuth } from './middleware/auth'
import { Top } from './containers/top';
import { Register } from "./containers/register";
import { Login } from "./containers/login";
import { Logout } from "./containers/logout";

export const Routes = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <div className='c-container'>
            <NoAuth store={store}>
              <Switch>
                <Route exact path={'/'} component={ Top } />
                <Route exact path={'/register'} component={ Register } />
                <Route exact path={'/login'} component={ Login } />
              </Switch>
            </NoAuth>
            <Auth store={store}>
              <Switch>
                <Route exact path={'/logout'} component={ Logout } />
              </Switch>
            </Auth>
          </div>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};
