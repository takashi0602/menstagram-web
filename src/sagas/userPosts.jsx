import { call, put, takeEvery } from 'redux-saga/effects';
import {
  USER_POSTS,
  successUserPosts,
  failUserPosts
} from '../actions/userPosts';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getUserPosts } from '../api/userPosts';

function* userPosts(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getUserPosts, action);
  if (response) {
    yield put(successUserPosts(response));
  } else {
    yield put(failUserPosts(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const userPostsSaga = [takeEvery(USER_POSTS, userPosts)];
