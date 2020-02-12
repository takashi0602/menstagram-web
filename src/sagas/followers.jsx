import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FOLLOWERS,
  successFollowers,
  failFollowers
} from '../actions/follow/followers';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getFollowers } from '../api/follow/followers';

function* followers(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getFollowers, action);
  if (response) {
    yield put(successFollowers(response, action));
  } else {
    yield put(failFollowers(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const followersSaga = [takeEvery(FOLLOWERS, followers)];
