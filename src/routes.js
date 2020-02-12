import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { history } from './history';
import { store, persistor } from './store/index';
import { Top } from './containers/top';
import { Register } from './containers/register';
import { Login } from './containers/login';
import { Follow } from './containers/follow';
import { SlurpDetail } from './containers/slurp/_id';
import { Slurp } from './containers/slurp';
import { Timeline } from './containers/timeline';
import { SlurpYums } from './containers/slurp/yums';
// import { Notification } from './containers/notification';
// import { Report } from './containers/report';
import { Profile } from './containers/profile';
import { ProfileEdit } from './containers/profile/edit';
import { Menu } from './components/menu';
import { Yums } from './containers/yums';
import { InitError } from './components/error/init';

export const Routes = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <div className="c-container mb-5">
            <Route component={InitError} />
            <Switch>
              <Route exact path={'/'} component={Top} />
              <Route exact path={'/register'} component={Register} />
              <Route exact path={'/login'} component={Login} />
              <Route exact path={'/user/:id'} component={Profile} />
              <Route exact path={'/user/:id/edit'} component={ProfileEdit} />
              <Route exact path={'/user/:id/follow'} component={Follow} />
              <Route exact path={'/user/:id/follower'} component={Follow} />
              <Route exact path={'/slurp'} component={Slurp} />
              <Route exact path={'/slurp/:id'} component={SlurpDetail} />
              <Route exact path={'/slurp/:id/yums'} component={SlurpYums} />
              <Route exact path={'/timeline/private'} component={Timeline} />
              <Route exact path={'/timeline/global'} component={Timeline} />
              <Route exact path={'/yums'} component={Yums} />
              {/*<Route exact path={'/notice/yummed'} component={Notification} />*/}
              {/*<Route exact path={'/notice/followed'} component={Notification} />*/}
              {/*<Route exact path={'/notice/system'} component={Notification} />*/}
              {/*<Route exact path={'/report'} component={Report} />*/}
              <Route exact path="*">
                <h1 className="text-center">
                  みないで
                  <span role="img" aria-label="ぴえん">
                    🥺
                  </span>
                </h1>
              </Route>
            </Switch>
            <Route component={Menu} />
          </div>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};
