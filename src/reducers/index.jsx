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
import { following } from './following';
import { followed } from './followed';
import { follow } from './follow';
import { profileEdit } from './profileEdit';

const combineReducer = combineReducers({
  auth,
  loading,
  slurp,
  slurpDetail,
  yums,
  profile,
  profileSlurps,
  profileEdit,
  privateTimeline,
  globalTimeline,
  yum,
  follow,
  slurpYums,
  following,
  followed,
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
