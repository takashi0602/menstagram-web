import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FOLLOWING,
  successFollowing,
  failFollowing
} from '../actions/follow/following';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getFollowing } from '../api/follow/following';

function* following(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getFollowing, action);
  if (response) {
    yield put(successFollowing(response, action));
  } else {
    yield put(failFollowing(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const followingSaga = [takeEvery(FOLLOWING, following)];
