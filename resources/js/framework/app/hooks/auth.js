import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const login = (token) => {
    dispatch({ type: 'LOGIN', payload: token });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return {
    token,
    login,
    logout,
  };
};

export const usePermissions = () => {
  const hasNotification = (notification) =>
    notification !== undefined && notification.message !== '';
  const hasUserAuthenticated = (token) => token !== null && token !== undefined;
  const hasAdminRoute = () =>
    typeof window !== typeof undefined
      ? window.location.href.includes('/admin')
        ? true
        : false
      : false;

  return {
    hasNotification,
    hasUserAuthenticated,
    hasAdminRoute,
  };
};
