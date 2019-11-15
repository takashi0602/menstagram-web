import React from 'react'
import { Redirect } from 'react-router-dom'

export const Auth = (props) => {
  return props.store.getState().auth.accessToken ? props.children : <Redirect to={'/login'} />;
};

export const NoAuth = (props) => {
  return props.store.getState().auth.accessToken ? <Redirect to={'/logout'} /> : props.children;
};
