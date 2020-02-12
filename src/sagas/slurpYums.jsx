import { call, put, takeEvery } from 'redux-saga/effects';
import {
  SLURP_YUMS,
  successSlurpYums,
  failSlurpYums
} from '../actions/slurpYums';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getSlurpYums } from '../api/slurpYums';

function* slurpYums(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getSlurpYums, action);
  if (response) {
    yield put(successSlurpYums(response, action.slurpId));
  } else {
    yield put(failSlurpYums(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const slurpYumsSaga = [takeEvery(SLURP_YUMS, slurpYums)];
