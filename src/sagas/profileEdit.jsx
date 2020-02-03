import { call, put, takeEvery } from 'redux-saga/effects';
import { patchProfileEdit } from '../api/profileEdit';
import {
  PROFILE_EDIT,
  successProfileEdit,
  failProfileEdit,
  clearProfileEdit
} from '../actions/profileEdit';
import { clearProfilePosts } from '../actions/profilePosts';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { history } from '../history';

function* profileEdit(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(patchProfileEdit, action);
  if (response) {
    yield put(successProfileEdit());
    yield put(clearProfilePosts());
    yield put(clearProfileEdit());
    const url = `/user/${action.userId}`;
    yield call(history.push, url);
  } else {
    yield put(failProfileEdit());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const profileEditSaga = [takeEvery(PROFILE_EDIT, profileEdit)];
