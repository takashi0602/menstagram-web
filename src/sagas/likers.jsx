import { call, put, takeEvery } from 'redux-saga/effects';
import { LIKERS, successLikers, failLikers } from '../actions/likers';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getLikers } from '../api/likers';

function* likers(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getLikers, action);
  if (response) {
    yield put(successLikers(response, action.postId));
  } else {
    yield put(failLikers(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const likersSaga = [takeEvery(LIKERS, likers)];
