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
import { PostDetail } from './containers/post/_id';
import { Logout } from './containers/logout';
import { Post } from './containers/post';
import { Timeline } from './containers/timeline';
import { Liker } from './containers/liker';

export const Routes = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <div className="c-container">
            <Switch>
              <Route exact path={'/'} component={Top} />
              <Route exact path={'/register'} component={Register} />
              <Route exact path={'/login'} component={Login} />
              <Route exact path={'/logout'} component={Logout} />
              <Route exact path={'/post/:id'} component={PostDetail} />
              <Route exact path={'/post'} component={Post} />
              <Route exact path={'/timeline'} component={Timeline} />
              <Route exact path={'/liker/:id'} component={Liker} />
              <Route exact path={'/follow'} component={Follow} />
              <Route exact path={'/users/:id/follow'} component={Follow} />
            </Switch>
          </div>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};
