import { call, put, takeLatest } from 'redux-saga/effects';
import { requestRegister } from '../api/auth';
import { REGISTER, successRegister, failRegister } from '../actions/auth'

function* register(payload) {
  try {
    const response = yield call(requestRegister, payload);
    yield put(successRegister, response);
  } catch (e) {
    yield put(failRegister);
  }
}

export const authSaga = [takeLatest(REGISTER, register)];
