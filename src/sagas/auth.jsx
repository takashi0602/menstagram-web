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
import * as errorHandle from "../actions/error";

function* register(payload) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(requestRegister, payload);
  if (response) {
    yield put(successRegister(response.data.access_token));
  } else {
    yield put(failRegister());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

function* login(payload) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response } = yield call(requestLogin, payload);
  if (response) {
    yield put(successLogin(response.data.access_token));
  } else {
    yield put(failLogin());
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

function* logout(payload) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response } = yield call(requestLogout, payload.accessToken);
  if (response) {
    yield put(successLogout());
  } else {
    yield put(failLogout(payload.accessToken));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const authSaga = [
  takeEvery(REGISTER, register),
  takeEvery(LOGIN, login),
  takeEvery(LOGOUT, logout)
];
