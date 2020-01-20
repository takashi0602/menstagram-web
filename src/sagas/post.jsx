import { call, put, takeEvery } from 'redux-saga/effects';
import { requestPostImages } from '../api/post';
import { POST, successPost, failPost } from '../actions/post';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { clearPrivateTimeline } from "../actions/timeline/private";
import { clearGlobalTimeline } from "../actions/timeline/global";

function* post(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(requestPostImages, action);
  let isRamen = true;
  if (response) {
    for (let i = 0; i < response.data.is_ramens.length; i++) {
      if (!response.data.is_ramens[i]) isRamen = false;
    }
  } else {
    yield put(failPost(response.data.is_ramens));
    yield put(errorHandle.error(error.response));
  }
  if (isRamen) {
    yield put(clearPrivateTimeline());
    yield put(clearGlobalTimeline());
    yield put(successPost());
  } else {
    const ramenJudgeError = {
      status: 406
    };
    yield put(failPost(response.data.is_ramens));
    yield put(errorHandle.error(ramenJudgeError));
  }
  yield put(notLoading());
}

export const postSaga = [takeEvery(POST, post)];
