import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react'
import { history } from './history';
import { store, persistor } from './store/index';
import { Top } from './containers/top';
import { Register } from "./containers/register";
import { Login } from "./containers/login";

export const Routes = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <div className='c-container'>
            <Switch>
              <Route exact path={'/'} component={ Top } />
              <Route exact path={'/register'} component={ Register } />
              <Route exact path={'/login'} component={ Login } />
            </Switch>
          </div>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};
