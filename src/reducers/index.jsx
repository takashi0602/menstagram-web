import { combineReducers } from 'redux';
import { history } from '../history';
import { connectRouter } from 'connected-react-router';
import register from './auth'

export const reducer = combineReducers({
  register,
  router: connectRouter(history)
});
