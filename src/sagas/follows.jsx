import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FOLLOWS,
  successFollows,
  failFollows
} from '../actions/follow/follows';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getFollows } from '../api/follow/follows';

function* follows(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getFollows, action);
  if (response) {
    yield put(successFollows(response, action));
  } else {
    yield put(failFollows(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const followsSaga = [takeEvery(FOLLOWS, follows)];
