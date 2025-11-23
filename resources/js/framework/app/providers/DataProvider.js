import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotifier, useAuth } from '@app/hooks';
import { loadWebsite } from '@modules/Settings/reducers/site';
import { loadThemes } from '@modules/Settings/reducers/platform';
import { getNotification } from '@modules/Settings/reducers/platform';
import { loadEntities } from '@modules/Entity/reducers/entities';

const DataProvider = ({ children }) => {
  const notification = useSelector(getNotification);
  const notify = useNotifier();
  const { token } = useAuth();
  const dispatch = useDispatch();
  const hasNotification = notification !== undefined && notification.message !== '';
  const hasUserAuthenticated = token;
  const hasAdminRoute =
    typeof window !== typeof undefined
      ? window.location.href.includes('/admin')
        ? true
        : false
      : false;

  React.useEffect(() => {
    dispatch(loadWebsite({ token }));
    dispatch(loadThemes({ token }));

    if (hasUserAuthenticated && hasAdminRoute) {
      dispatch(loadEntities(token));
    }

    if (hasNotification) {
      if (notification.type == 'error') {
        notify(notification.message, 'error');
      }
      if (notification.type == 'message') {
        notify(notification.message);
      }
    }

    return () => {};
  }, [token, notification]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default DataProvider;
