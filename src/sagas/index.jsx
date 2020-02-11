import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { slurpSaga } from './slurp';
import { postDetailSaga } from './postDetail';
import { timelineSaga } from './timeline';
import { yumsSaga } from './yums';
import { profileSaga } from './profile';
import { profilePostsSaga } from './profilePosts';
import { yumSaga } from './yum';
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
    ...yumsSaga,
    ...yumSaga,
    ...likersSaga,
    ...profileSaga,
    ...profilePostsSaga,
    ...followingSaga,
    ...followedSaga,
    ...followSaga,
    ...profileEditSaga
  ]);
}
