import { call, put, takeEvery } from 'redux-saga/effects';
import {requestRegister, requestLogin, requestLogout} from '../api/auth';
import { REGISTER, successRegister, failRegister } from '../actions/auth/register'
import { LOGIN, successLogin, failLogin } from '../actions/auth/login'
import { LOGOUT, successLogout, failLogout } from "../actions/auth/logout";

function* register(payload) {
  const { response, error } = yield call(requestRegister, payload);
  if (response) {
    yield put(successRegister(response.data.access_token));
  } else {
    yield put(failRegister());
  }
}

function* login(payload) {
  const { response, error } = yield call(requestLogin, payload);
  if (response) {
    yield put(successLogin(response.data.access_token));
  } else {
    yield put(failLogin());
  }
}

function* logout(payload) {
  console.log(payload.accessToken, 'サガ');
  const { response, error } = yield call(requestLogout, payload.accessToken);
  if (response) {
    yield put(successLogout());
  } else {
    yield put(failLogout(payload.accessToken));
  }
}

export const authSaga = [
  takeEvery(REGISTER, register),
  takeEvery(LOGIN, login),
  takeEvery(LOGOUT, logout)
];
