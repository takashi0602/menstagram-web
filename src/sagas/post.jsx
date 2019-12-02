import { call, put, takeEvery } from 'redux-saga/effects';
import { requestPostImages } from '../api/post';
import { POST, successPost, failPost } from '../actions/post';
import { loading, notLoading } from '../actions/loading';

function* post(action) {
  yield put(loading());
  const { error } = yield call(requestPostImages, action);
  if (error) {
    yield put(failPost(error.status));
  } else {
    yield put(successPost(200));
  }
  yield put(notLoading());
}

export const postSaga = [takeEvery(POST, post)];
