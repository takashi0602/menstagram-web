import { call, put, takeEvery } from 'redux-saga/effects';
import { YUMS, successYums, failYums } from '../actions/yums';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getYums } from '../api/yums';

function* yums(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getYums, action);
  if (response) {
    response.data.reverse();
    if (action.params.type === 'new') {
      response.data.pop();
      response.data = response.data.concat(action.slurpList);
    } else if (action.params.type === 'old') {
      response.data.shift();
      response.data = action.slurpList.concat(response.data);
    }
    yield put(successYums(response));
  } else {
    yield put(failYums(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const yumsSaga = [takeEvery(YUMS, yums)];
