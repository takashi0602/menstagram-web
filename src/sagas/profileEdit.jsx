import { call, put, takeEvery } from 'redux-saga/effects';
import { patchProfileEdit } from '../api/profileEdit';
import { editAvatar } from '../api/avatarEdit';
import {
  PROFILE_EDIT,
  successProfileEdit,
  failProfileEdit,
  clearProfileEdit
} from '../actions/profileEdit';
import { clearProfileSlurps } from '../actions/profileSlurps';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { history } from '../history';

function* profileEdit(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(patchProfileEdit, action);

  let editError = false;
  if (action.formData) {
    const { avatarEditError } = yield call(editAvatar, action);
    if (avatarEditError) {
      editError = true;
      yield put(failProfileEdit());
      yield put(errorHandle.error(avatarEditError.response));
    }
  }

  if (response && !editError) {
    yield put(successProfileEdit());
    yield put(clearProfileSlurps());
    yield put(clearProfileEdit());
    const url = `/user/${action.userId}`;
    yield call(history.push, url);
  } else if (error) {
    yield put(failProfileEdit());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const profileEditSaga = [takeEvery(PROFILE_EDIT, profileEdit)];
