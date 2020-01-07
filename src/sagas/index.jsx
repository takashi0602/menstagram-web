import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { postSaga } from './post';
import { timelineSaga } from './timeline';
import { likesSaga } from './likes';
import { profileSaga } from './profile';
import { userPostsSaga } from './userPosts';
import { likePostSaga } from './likePost';

export default function* rootSaga() {
  yield all([
    ...authSaga,
    ...postSaga,
    ...timelineSaga,
    ...likesSaga,
    ...likePostSaga,
    ...profileSaga,
    ...userPostsSaga
  ]);
}
