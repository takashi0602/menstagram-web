import { call, put, takeEvery } from 'redux-saga/effects';
import { requestPostImages } from '../api/post';
import { POST, successPost, failPost } from '../actions/post';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';

function* post(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(requestPostImages, action);
  if (response) {
    let isRamen = true;
    for (let i = 0; i < response.data.is_ramens.length; i++) {
      if (!response.data.is_ramens[i]) isRamen = false;
    }
    if (isRamen) {
      yield put(successPost());
    } else {
      const ramenJudgeError = {
        status: 406
      };
      yield put(failPost(response.data.is_ramens));
      yield put(errorHandle.error(ramenJudgeError));
    }
  } else {
    yield put(failPost([]));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const postSaga = [takeEvery(POST, post)];
