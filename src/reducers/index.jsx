import { combineReducers } from 'redux';
import { history } from '../history';
import { connectRouter } from 'connected-react-router';
import { auth } from './auth'

export const reducer = combineReducers({
  auth,
  router: connectRouter(history)
});
