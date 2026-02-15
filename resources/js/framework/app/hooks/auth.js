import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSecureRoute } from '@app/hooks';

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
  const api = useSecureRoute();
  const hasNotification = (notification) =>
    notification !== undefined && notification.message !== '';

  const hasUserAuthenticated = (token) => token !== null && token !== undefined;
  
  const hasAdminRoute = () =>
    typeof window !== typeof undefined
      ? window.location.href.includes('/admin')
        ? true
        : false
      : false;

  const hasTokenValidated = async (token) => {
    // Placeholder for token validation logic
    try {
      const response = await api.get('/token');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  return {
    hasNotification,
    hasTokenValidated,
    hasUserAuthenticated,
    hasAdminRoute,
  };
};
