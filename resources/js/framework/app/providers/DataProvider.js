import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotifier, useAuth, usePermissions } from '@app/hooks';
import { loadWebsite } from '@modules/Settings/reducers/site';
import { loadThemes } from '@modules/Settings/reducers/platform';
import { getNotification } from '@modules/Settings/reducers/platform';
import { loadEntities } from '@modules/Entity/reducers/entities';

const DataProvider = ({ children }) => {
  const { token } = useAuth();
  const notify = useNotifier();
  const dispatch = useDispatch();
  const notification = useSelector(getNotification);
  const websiteProps = useSelector((state) => ({
    name: state.site.name,
    title: state.site.title
  }));
  const { hasAdminRoute, hasNotification, hasUserAuthenticated } = usePermissions();
  const isUserAuthorized = hasUserAuthenticated(token) && hasAdminRoute();
  const isUserOnWebsite = !hasAdminRoute();

  React.useEffect(() => {
    if (isUserOnWebsite || isUserAuthorized) {
      dispatch(loadWebsite({token}));
    }

    if (hasUserAuthenticated(token) && hasAdminRoute()) {
      dispatch(loadEntities(token));
      dispatch(loadThemes());
    }

    if (hasNotification(notification) && hasAdminRoute()) {
      if (notification.type == 'error') {
        notify(notification.message, 'error');
      }
      if (notification.type == 'message') {
        notify(notification.message);
      }
    }

    return () => {};
  }, [token, notification]);

  React.useEffect(() => {
    if (typeof window !== typeof undefined) {
      window.document.title = `${websiteProps.name} - ${websiteProps.title}`;
      window.document.querySelector('meta[name="description"]')?.setAttribute('content', 'Postbox');
    }
  },[]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default DataProvider;
