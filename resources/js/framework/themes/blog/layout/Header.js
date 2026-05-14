import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { Container, Typography, Toolbar, AppBar } from '@mui/material';

import { useAppCSS } from '@app/hooks';
import { getWebsiteLogo, getWebsiteName } from '@modules/settings/reducers/site';
import { site } from '@app/constants';

export const Header = () => {
  const classes = useAppCSS();
  const websiteName = useSelector(getWebsiteName);
  const websiteLogo = useSelector(getWebsiteLogo);

  return (
    <AppBar position="relative" className={clsx(classes.appBar, 'open')}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
            {websiteLogo ? (
              <img src={`${site.url}/uploads/settings/${websiteLogo}`} style={{ maxHeight: '36px' }} />
            ) : (
              websiteName
            )}
          </Typography>
        </Toolbar>
      </Container>{' '}
    </AppBar>
  );
};

export default Header;
