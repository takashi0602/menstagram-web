import { call, put, takeEvery } from 'redux-saga/effects';
import {
  POST_DETAIL,
  successPostDetail,
  failPostDetail
} from '../actions/postDetail';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { requestPostDetail } from '../api/postDetail';

function* postDetail(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(requestPostDetail, action);
  if (response) {
    yield put(successPostDetail(response));
  } else {
    yield put(failPostDetail(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const postDetailSaga = [takeEvery(POST_DETAIL, postDetail)];
