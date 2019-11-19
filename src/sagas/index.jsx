import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { postSaga } from './post';
import { postDetailSaga } from './postDetail';
import { timelineSaga } from './timeline';

export default function* rootSaga() {
  yield all([...authSaga, ...postSaga, ...postDetailSaga, ...timelineSaga]);
}
