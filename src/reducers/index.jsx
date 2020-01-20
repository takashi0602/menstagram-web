import { combineReducers } from 'redux';
import { history } from '../history';
import { connectRouter } from 'connected-react-router';
import { auth } from './auth';
import { loading } from './loading';
import { post } from './post';
import { postDetail } from './postDetail';
import { error } from './error';
import { privateTimeline } from './timeline/private';
import { globalTimeline } from './timeline/global';
import { likes } from './likes';
import { profile } from './profile';
import { profilePosts } from './profilePosts';
import { likePost } from './likePost';
import { likers } from './likers';
import { following } from './following';
import { followed } from './followed';
import { follow } from './follow';
import { profileEdit } from './profileEdit';

const combineReducer = combineReducers({
  auth,
  loading,
  post,
  postDetail,
  likes,
  profile,
  profilePosts,
  profileEdit,
  privateTimeline,
  globalTimeline,
  likePost,
  follow,
  likers,
  following,
  followed,
  error,
  router: connectRouter(history)
});

export const reducer = (state, action) => {
  if (action.type === 'CLEAR_STATE') {
    state = undefined;
  }
  return combineReducer(state, action);
};
