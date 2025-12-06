import React from 'react';
import { useSelector } from 'react-redux';

import { Container, CssBaseline, Grid } from '@mui/material';
import Panel from '@ui/components/Panel';
import Icon from '@ui/elements/Icon';
import { useWebCSS } from '@app/hooks';

import { getWebsiteStatus } from '@modules/Settings/reducers/site';
import { site } from '@app/utils';
import Title from '@ui/elements/Title';
import UserInfo from '@themes/blog/components/UserInfo';
import Consumer from '@website/components/Consumer';
import FeedPanel from '../components/FeedPanel';

export const Body = () => {
  const websiteStatus = useSelector(getWebsiteStatus);
  const systemStatus = useSelector((state) => state.site.status);
  const classes = useWebCSS();
  // const attributes = useConsumer();

  const BodyContent = ({ message }) => (
    <Grid container spacing={2} className={classes.body}>
      <Consumer table="pages">
        <UserInfo message={message} />
      </Consumer>
      <Consumer table="posts">
        <FeedPanel message={message} />
      </Consumer>
      <Consumer table="users">
        <UserInfo message={message} />
      </Consumer>
    </Grid>
  );

  const ComingSoonContent = () => (
    <Grid container justifyContent={'center'} flex={1} spacing={2}>
      <Grid
        alignItems={'center'}
        textAlign={'center'}
        justifyContent={'center'}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Icon name="fa-dolly" color="#ccc" size="240px" />
      </Grid>
      <Grid
        alignItems={'center'}
        textAlign={'center'}
        justifyContent={'center'}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Title sx={{ marginTop: '10px' }} variant="normal">
          {site.comingSoonMessage}
        </Title>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg" style={{ justifyContent: 'center', display: 'flex' }}>
      {/* shift the above code to Theme and render the theme as a module through Website layout */}
      {systemStatus === 'idle' && <BodyContent message={site.loadingMessage} />}
      {systemStatus !== 'idle' && websiteStatus && <BodyContent message={site.themeMessage} />}
      {systemStatus !== 'idle' && !websiteStatus && <ComingSoonContent />}
    </Container>
  );
};

export default Body;
