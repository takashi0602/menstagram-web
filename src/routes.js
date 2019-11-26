import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { history } from './history';
import { store, persistor } from './store/index';
import { Top } from './containers/top';
<<<<<<< HEAD
import { Register } from './containers/register';
import { Login } from './containers/login';
import { Logout } from './containers/logout';
import { Notification } from './containers/notification';
import { Follow } from './containers/notification/follow';
import { Management } from './containers/notification/management';



=======
import { Register } from "./containers/register";
import { Login } from "./containers/login";
import { Notification } from "./containers/notification";
>>>>>>> 70a55ee25630e0ec490f5e57e5af3047bfa05311

export const Routes = () => {
  return (
    <Provider store={store}>
<<<<<<< HEAD
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <div className="c-container">
            <Switch>
              <Route exact path={'/'} component={Top} />
              <Route exact path={'/register'} component={Register} />
              <Route exact path={'/login'} component={Login} />
              <Route exact path={'/logout'} component={Logout} />
              <Route exact path={'/notification'} component={Notification} />
              <Route exact path={'/notification/follow'} component={Follow} />
              <Route exact path={'/notification/management'} component={Management} />
              
            </Switch>
          </div>
        </ConnectedRouter>
      </PersistGate>
=======
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
>>>>>>> 70a55ee25630e0ec490f5e57e5af3047bfa05311
    </Provider>
  );
};
