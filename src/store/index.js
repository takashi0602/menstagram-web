import { createStore, applyMiddleware } from 'redux';
import { reducer } from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
// import { history } from '../history'

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));
