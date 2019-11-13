import { combineReducers } from 'redux';
import { history } from '../history';
import { connectRouter } from 'connected-react-router';
import { register, login } from './auth'

export const reducer = combineReducers({
  register,
  login,
  router: connectRouter(history)
});
