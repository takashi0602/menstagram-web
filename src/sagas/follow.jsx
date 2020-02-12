import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FOLLOW,
  successFollow,
  failFollow,
  UNFOLLOW,
  successUnfollow,
  failUnfollow
} from '../actions/follow';
import * as errorHandle from '../actions/error';
import { loading, notLoading } from '../actions/loading';
import { follow as requestFollow, unfollow as requestUnfollow } from '../api/follow';

function* follow(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(requestFollow, action);
  if (response) {
    yield put(successFollow(action.userId));
  } else {
    yield put(failFollow());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

function* unfollow(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(requestUnfollow, action);
  if (response) {
    yield put(successUnfollow(action.userId));
  } else {
    yield put(failUnfollow());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const followSaga = [
  takeEvery(FOLLOW, follow),
  takeEvery(UNFOLLOW, unfollow)
];
