import { call, put, takeEvery } from 'redux-saga/effects';
import {
  LIKES,
  successLikes,
  failLikes
} from '../actions/likes';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getLikes } from "../api/likes";

function* likes(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getLikes, action);
  if (response) {
    response.data.reverse();
    if (action.params.type === 'new') {
      response.data.pop();
      response.data = response.data.concat(action.postList);
    } else if (action.params.type === 'old') {
      response.data.shift();
      response.data = action.postList.concat(response.data);
    }
    yield put(successLikes(response));
  } else {
    yield put(failLikes(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  yield put(notLoading());
}

export const likesSaga = [
  takeEvery(LIKES, likes)
];
