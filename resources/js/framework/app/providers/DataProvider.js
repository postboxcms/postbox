import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotifier, useAuth, usePermissions, useNavigation } from '@app/hooks';
import { loadWebsite } from '@modules/Settings/reducers/site';
import { loadThemes } from '@modules/Settings/reducers/platform';
import { getNotification } from '@modules/Settings/reducers/platform';
import { loadEntities } from '@modules/Entity/reducers/entities';
import { clearUserState, logoutUser } from '@modules/Auth/reducers/user';
import { api } from '@app/utils/constants';

const DataProvider = ({ children }) => {
  const { token } = useAuth();
  const notify = useNotifier();
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const notification = useSelector(getNotification);
  const { hasAdminRoute, hasNotification, hasUserAuthenticated, hasTokenValidated } =
    usePermissions();
  const isUserAuthorized = hasUserAuthenticated(token) && hasAdminRoute();
  const isUserOnWebsite = !hasAdminRoute();
  const websiteProps = useSelector((state) => ({
    name: state.site.name,
    title: state.site.title
  }));

  React.useEffect(() => {
    if (token != null && token != undefined) {
      hasTokenValidated(token).then((isValid) => {
        if (!isValid) {
          dispatch(logoutUser(token));
          dispatch(clearUserState());
          navigate(api.loginUrl);
        }
      });
    }

    if (isUserOnWebsite || isUserAuthorized) {
      dispatch(loadWebsite({ token }));
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
