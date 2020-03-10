import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FOLLOWEES,
  successFollowees,
  failFollowees
} from '../actions/follow/followees';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getFollowees } from '../api/follow/followees';

function* followees(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getFollowees, action);
  if (response) {
    yield put(successFollowees(response, action));
  } else {
    yield put(failFollowees(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const followeesSaga = [takeEvery(FOLLOWEES, followees)];
