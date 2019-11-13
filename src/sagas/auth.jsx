import { call, put, takeEvery } from 'redux-saga/effects';
import { requestRegister } from '../api/auth';
import { REGISTER, failRegister, successRegister } from '../actions/auth'

function* register(payload) {
  const { response, error } = yield call(requestRegister, payload);
  if (response) {
    yield put(successRegister(response.data.access_token))
  } else {
    yield put(failRegister());
  }
}

export const authSaga = [takeEvery(REGISTER, register)];
