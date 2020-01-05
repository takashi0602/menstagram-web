import { combineReducers } from 'redux';
import { history } from '../history';
import { connectRouter } from 'connected-react-router';
import { auth } from './auth';
import { loading } from './loading';
import { post } from './post';
import { error } from './error';
import { privateTimeline } from './timeline/private';
import { globalTimeline } from './timeline/global';
import { likes } from './likes';

export const reducer = combineReducers({
  auth,
  loading,
  post,
  likes,
  privateTimeline,
  globalTimeline,
  error,
  router: connectRouter(history)
});
