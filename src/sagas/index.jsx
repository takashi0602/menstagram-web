import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { postSaga } from './post';
import { postDetailSaga } from './postDetail';
import { timelineSaga } from './timeline';
import { likesSaga } from './likes';
import { profileSaga } from './profile';
import { userPostsSaga } from './userPosts';
import { likePostSaga } from './likePost';
import { likersSaga } from './likers';
import { followingSaga } from './following';
import { followedSaga } from './followed';

export default function* rootSaga() {
  yield all([
    ...authSaga,
    ...postSaga,
    ...postDetailSaga,
    ...timelineSaga,
    ...likesSaga,
    ...likePostSaga,
    ...likersSaga,
    ...profileSaga,
    ...userPostsSaga,
    ...followingSaga,
    ...followedSaga
  ]);
}
