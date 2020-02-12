import { call, put, takeEvery } from 'redux-saga/effects';
import {
  PROFILE_SLURPS,
  successProfileSlurps,
  failProfileSlurps
} from '../actions/profileSlurps';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getProfileSlurps } from '../api/profileSlurps';
import { getProfile } from '../api/profile';
import { failProfile, successProfile } from '../actions/profile';

function* profileSlurps(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getProfile, action);
  const { slurpsResponse, slurpsError } = yield call(getProfileSlurps, action);
  if (response) {
    yield put(successProfile(response));
  } else {
    yield put(failProfile(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  if (slurpsResponse) {
    slurpsResponse.data.reverse();
    yield put(successProfileSlurps(slurpsResponse));
  } else {
    yield put(failProfileSlurps(slurpsError.response.status));
    yield put(errorHandle.error(slurpsError.response));
  }
  yield put(notLoading());
}

export const profileSlurpsSaga = [takeEvery(PROFILE_SLURPS, profileSlurps)];
