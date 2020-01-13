import { call, put, takeEvery } from 'redux-saga/effects';
import { PROFILE, successProfile, failProfile } from '../actions/profile';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getProfile } from '../api/profile';

function* profile(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getProfile, action);
  if (response) {
    yield put(successProfile(response));
  } else {
    yield put(failProfile(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const profileSaga = [takeEvery(PROFILE, profile)];
