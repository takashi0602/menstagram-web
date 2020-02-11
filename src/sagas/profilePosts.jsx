import { call, put, takeEvery } from 'redux-saga/effects';
import {
  PROFILE_POSTS,
  successProfilePosts,
  failProfilePosts
} from '../actions/profilePosts';
import { loading, notLoading } from '../actions/loading';
import * as errorHandle from '../actions/error';
import { getProfilePosts } from '../api/profilePosts';
import { getProfile } from '../api/profile';
import { failProfile, successProfile } from '../actions/profile';

function* profilePosts(action) {
  yield put(loading());
  yield put(errorHandle.notError());
  const { response, error } = yield call(getProfile, action);
  const { postsResponse, postsError } = yield call(getProfilePosts, action);
  if (response) {
    yield put(successProfile(response));
  } else {
    yield put(failProfile(error.response.status));
    yield put(errorHandle.error(error.response));
  }
  if (postsResponse) {
    postsResponse.data.reverse();
    yield put(successProfilePosts(postsResponse));
  } else {
    yield put(failProfilePosts(postsError.response.status));
    yield put(errorHandle.error(postsError.response));
  }
  yield put(notLoading());
}

export const profilePostsSaga = [takeEvery(PROFILE_POSTS, profilePosts)];
