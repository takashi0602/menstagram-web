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
import { postFollow, postUnfollow } from "../api/follow";

function* follow(action) {
  yield put(errorHandle.notError());
  const { response, error } = yield call(postFollow, action);
  if (response) {
    yield put(successFollow(action.userId));
  } else {
    yield put(failFollow());
    yield put(errorHandle.error(error.response));
  }
}

function* unfollow(action) {
  yield put(errorHandle.notError());
  const { response, error } = yield call(postUnfollow, action);
  if (response) {
    yield put(successUnfollow(action.userId));
  } else {
    yield put(failUnfollow());
    yield put(errorHandle.error(error.response));
  }
}

export const followSaga = [
  takeEvery(FOLLOW, follow),
  takeEvery(UNFOLLOW, unfollow)
];
