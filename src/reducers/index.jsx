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
import { likePost } from './likePost';
import { likers } from './likers';

const combineReducer = combineReducers({
  auth,
  loading,
  post,
  likes,
  privateTimeline,
  globalTimeline,
  likePost,
  likers,
  error,
  router: connectRouter(history)
});

export const reducer = (state, action) => {
  if (action.type === 'CLEAR_STATE') {
    state = undefined;
  }
  return combineReducer(state, action);
};
