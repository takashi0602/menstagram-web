import { call, put, takeEvery } from 'redux-saga/effects';
import {
  YUM,
  successYum,
  failYum,
  UNYUM,
  successUnyum,
  failUnyum
} from '../actions/yum';
import * as errorHandle from '../actions/error';
import { yum as yumRequest, unyum as unyumRequest } from '../api/yum';
import { loading, notLoading } from '../actions/loading';

function* yum(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(yumRequest, action);
  if (response) {
    yield put(successYum(action.postId));
  } else {
    yield put(failYum());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

function* unyum(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(unyumRequest, action);
  if (response) {
    yield put(successUnyum(action.postId));
  } else {
    yield put(failUnyum());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const yumSaga = [takeEvery(YUM, yum), takeEvery(UNYUM, unyum)];
