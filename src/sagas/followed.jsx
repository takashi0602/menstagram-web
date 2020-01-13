import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FOLLOWED,
  successFollowed,
  failFollowed
} from '../actions/follow/followed';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getFollowed } from '../api/follow/followed';

function* followed(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getFollowed, action);
  if (response) {
    yield put(successFollowed(response, action));
  } else {
    yield put(failFollowed(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const followedSaga = [takeEvery(FOLLOWED, followed)];
