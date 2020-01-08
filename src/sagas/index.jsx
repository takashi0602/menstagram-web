import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { postSaga } from './post';
import { timelineSaga } from './timeline';
import { likesSaga } from './likes';
import { likePostSaga } from './likePost';
import { likersSaga } from './likers';

export default function* rootSaga() {
  yield all([
    ...authSaga,
    ...postSaga,
    ...timelineSaga,
    ...likesSaga,
    ...likePostSaga,
    ...likersSaga
  ]);
}
