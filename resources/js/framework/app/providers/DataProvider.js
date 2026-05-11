import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotifier, useNavigation } from '@app/hooks';
import { useAuth, usePermissions } from '@modules/auth/hooks';
import { loadWebsite } from '@modules/settings/reducers/site';
import { loadThemes } from '@modules/settings/reducers/platform';
import { getNotification } from '@modules/settings/reducers/platform';
import { loadEntities } from '@modules/entity/reducers/entities';
import { clearUserState, logoutUser } from '@modules/auth/reducers/user';
import { api, entity } from '@app/constants';

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
    title: state.site.title,
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
        dispatch(loadEntities(token));
      }
    }

    return () => {};
  }, [token, notification]);

  React.useEffect(() => {
    if (typeof window !== typeof undefined) {
      if (websiteProps?.name && websiteProps?.title) {
        window.document.title = `${websiteProps.title} - ${websiteProps.name}`;
        window.document
          .querySelector('meta[name="description"]')
          ?.setAttribute('content', 'Postbox');
      }
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default DataProvider;
