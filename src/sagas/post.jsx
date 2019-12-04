import { call, put, takeEvery } from 'redux-saga/effects';
import { requestPostImages } from '../api/post';
import { POST, successPost, failPost } from '../actions/post';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from "../actions/error";

function* post(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(requestPostImages, action);
  if (response) {
    yield put(successPost());
  } else {
    yield put(failPost());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const postSaga = [takeEvery(POST, post)];
