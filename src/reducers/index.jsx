import { combineReducers } from 'redux';
import { history } from '../history';
import { connectRouter } from 'connected-react-router';
import { auth } from './auth';
import { loading } from './loading';
import { slurp } from './slurp';
import { slurpDetail } from './slurpDetail';
import { error } from './error';
import { privateTimeline } from './timeline/private';
import { globalTimeline } from './timeline/global';
import { yums } from './yums';
import { profile } from './profile';
import { profileSlurps } from './profileSlurps';
import { yum } from './yum';
import { slurpYums } from './slurpYums';
import { follows } from './follows';
import { followers } from './followers';
import { follow } from './follow';
import { profileEdit } from './profileEdit';

const combineReducer = combineReducers({
  auth,
  loading,
  slurp,
  slurpDetail,
  slurpYums,
  profile,
  profileSlurps,
  profileEdit,
  privateTimeline,
  globalTimeline,
  yums,
  yum,
  follow,
  follows,
  followers,
  error,
  router: connectRouter(history)
});

export const reducer = (state, action) => {
  if (action.type === 'CLEAR_STATE') {
    state = {
      router: state.router
    };
  }
  return combineReducer(state, action);
};
