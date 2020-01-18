import { call, put, takeEvery } from 'redux-saga/effects';
import {
  LIKE_POST,
  successLikePost,
  failLikePost,
  NOT_LIKE_POST,
  successNotLikePost,
  failNotLikePost
} from '../actions/likePost';
import * as errorHandle from '../actions/error';
import { postLikePost, postNotLikePost } from '../api/likePost';
import { loading, notLoading } from '../actions/loading';

function* likePost(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(postLikePost, action);
  if (response) {
    yield put(successLikePost(action.postId));
  } else {
    yield put(failLikePost());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

function* notLikePost(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(postNotLikePost, action);
  if (response) {
    yield put(successNotLikePost(action.postId));
  } else {
    yield put(failNotLikePost());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const likePostSaga = [
  takeEvery(LIKE_POST, likePost),
  takeEvery(NOT_LIKE_POST, notLikePost)
];
