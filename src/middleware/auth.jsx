import React from 'react'
import { Redirect } from 'react-router-dom'

export const auth = (accessToken) => {
  if (accessToken) return;
  return <Redirect to={'/login'} />;
};

export const noAuth = (accessToken) => {
  if (accessToken) return <Redirect to={'/logout'} />;
};
