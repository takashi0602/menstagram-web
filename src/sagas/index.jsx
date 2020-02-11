import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { slurpSaga } from './slurp';
import { postDetailSaga } from './postDetail';
import { timelineSaga } from './timeline';
import { likesSaga } from './likes';
import { profileSaga } from './profile';
import { profilePostsSaga } from './profilePosts';
import { likePostSaga } from './likePost';
import { likersSaga } from './likers';
import { followingSaga } from './following';
import { followedSaga } from './followed';
import { profileEditSaga } from './profileEdit';
import { followSaga } from './follow';

export default function* rootSaga() {
  yield all([
    ...authSaga,
    ...slurpSaga,
    ...postDetailSaga,
    ...timelineSaga,
    ...likesSaga,
    ...likePostSaga,
    ...likersSaga,
    ...profileSaga,
    ...profilePostsSaga,
    ...followingSaga,
    ...followedSaga,
    ...followSaga,
    ...profileEditSaga
  ]);
}
