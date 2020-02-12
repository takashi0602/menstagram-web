import { call, put, takeEvery } from 'redux-saga/effects';
import { requestSlurpImages } from '../api/slurp';
import { SLURP, successSlurp, failSlurp } from '../actions/slurp';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { clearPrivateTimeline } from '../actions/timeline/private';
import { clearGlobalTimeline } from '../actions/timeline/global';

function* slurp(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(requestSlurpImages, action);
  if (response) {
    let isRamen = true;
    for (let i = 0; i < response.data.is_ramens.length; i++) {
      if (!response.data.is_ramens[i]) isRamen = false;
    }
    if (isRamen) {
      yield put(clearPrivateTimeline());
      yield put(clearGlobalTimeline());
      yield put(successSlurp());
    } else {
      const ramenJudgeError = {
        status: 406
      };
      yield put(failSlurp(response.data.is_ramens));
      yield put(errorHandle.error(ramenJudgeError));
    }
  } else {
    yield put(failSlurp([]));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const slurpSaga = [takeEvery(SLURP, slurp)];
