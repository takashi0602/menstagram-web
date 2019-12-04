import { combineReducers } from 'redux';
import { history } from '../history';
import { connectRouter } from 'connected-react-router';
import { auth } from './auth';
import { loading } from './loading';
import { post } from './post';
import { error } from "./error";

export const reducer = combineReducers({
  auth,
  loading,
  post,
  error,
  router: connectRouter(history)
});
