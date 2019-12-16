import { call, put, takeEvery } from 'redux-saga/effects';
import {
  PRIVATE_TIMELINE,
  successPrivateTimeline,
  failPrivateTimeline
} from '../actions/timeline/private';
import {
  GLOBAL_TIMELINE,
  successGlobalTimeline,
  failGlobalTimeline
} from '../actions/timeline/global';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getTimeline } from '../api/timeline';

function* privateTimeline(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getTimeline, action);
  if (response) {
    yield put(successPrivateTimeline(response));
  } else {
    yield put(failPrivateTimeline(error.response));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

function* globalTimeline(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getTimeline, action);
  if (response) {
    yield put(successGlobalTimeline(response));
  } else {
    yield put(failGlobalTimeline(error.response));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const timelineSaga = [
  takeEvery(PRIVATE_TIMELINE, privateTimeline),
  takeEvery(GLOBAL_TIMELINE, globalTimeline)
];
