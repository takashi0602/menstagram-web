import { createStore, applyMiddleware } from 'redux';
import { reducer } from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'access_token',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
