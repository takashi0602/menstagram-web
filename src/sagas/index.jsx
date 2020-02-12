import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { slurpSaga } from './slurp';
import { slurpDetailSaga } from './slurpDetail';
import { timelineSaga } from './timeline';
import { yumsSaga } from './yums';
import { profileSaga } from './profile';
import { profileSlurpsSaga } from './profileSlurps';
import { yumSaga } from './yum';
import { slurpYumsSaga } from './slurpYums';
import { followingSaga } from './following';
import { followedSaga } from './followed';
import { profileEditSaga } from './profileEdit';
import { followSaga } from './follow';

export default function* rootSaga() {
  yield all([
    ...authSaga,
    ...slurpSaga,
    ...slurpDetailSaga,
    ...timelineSaga,
    ...yumsSaga,
    ...yumSaga,
    ...slurpYumsSaga,
    ...profileSaga,
    ...profileSlurpsSaga,
    ...followingSaga,
    ...followedSaga,
    ...followSaga,
    ...profileEditSaga
  ]);
}
