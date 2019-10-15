import { combineReducers } from 'redux';
import { history } from '../history';
import { connectRouter } from 'connected-react-router';

export const reducer = combineReducers({
  router: connectRouter(history)
});
