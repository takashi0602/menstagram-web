import { call, put, takeEvery } from 'redux-saga/effects';
import { requestRegister, requestLogin } from '../api/auth';
import { REGISTER, successRegister, failRegister } from '../actions/auth/register'
import { LOGIN, successLogin, failLogin } from '../actions/auth/login'

function* register(payload) {
  const { response, error } = yield call(requestRegister, payload);
  if (response) {
    yield put(successRegister(response.data.access_token))
  } else {
    yield put(failRegister());
  }
}

function* login(payload) {
  const { response, error } = yield call(requestLogin, payload);
  if (response) {
    yield put(successLogin(response.data.access_token))
  } else {
    yield put(failLogin());
  }
}

export const authSaga = [
  takeEvery(REGISTER, register),
  takeEvery(LOGIN, login)
];
