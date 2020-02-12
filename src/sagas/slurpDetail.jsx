import { call, put, takeEvery } from 'redux-saga/effects';
import {
  SLURP_DETAIL,
  successSlurpDetail,
  failSlurpDetail
} from '../actions/slurpDetail';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getSlurpDetail } from '../api/slurpDetail';

function* slurpDetail(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getSlurpDetail, action);
  if (response) {
    yield put(successSlurpDetail(response));
  } else {
    yield put(failSlurpDetail(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const slurpDetailSaga = [takeEvery(SLURP_DETAIL, slurpDetail)];
