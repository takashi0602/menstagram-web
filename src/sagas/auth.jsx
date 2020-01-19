import { call, put, takeEvery } from 'redux-saga/effects';
import { requestRegister, requestLogin, requestLogout } from '../api/auth';
import {
  REGISTER,
  successRegister,
  failRegister
} from '../actions/auth/register';
import { LOGIN, successLogin, failLogin } from '../actions/auth/login';
import { LOGOUT, successLogout, failLogout } from '../actions/auth/logout';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { clearState } from '../actions/clearState';

function* register(payload) {
  yield put(clearState());
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(requestRegister, payload);
  if (response) {
    const successData = {
      accessToken: response.data.access_token,
      userId: payload.payload.user_id
    };
    yield put(successRegister(successData));
  } else {
    yield put(failRegister());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

function* login(payload) {
  yield put(clearState());
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(requestLogin, payload);
  if (response) {
    const successData = {
      accessToken: response.data.access_token,
      userId: payload.payload.user_id
    };
    yield put(successLogin(successData));
  } else {
    yield put(failLogin());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

function* logout(payload) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(requestLogout, payload.accessToken);
  if (response) {
    yield put(successLogout());
    yield put(clearState());
  } else {
    const failData = {
      accessToken: payload.accessToken,
      userId: payload.user_id
    };
    yield put(failLogout(failData));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const authSaga = [
  takeEvery(REGISTER, register),
  takeEvery(LOGIN, login),
  takeEvery(LOGOUT, logout)
];
