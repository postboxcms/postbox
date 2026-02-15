import React from 'react';
import { first } from 'lodash';
import { Avatar, Grid } from '@mui/material';
import Panel from '@ui/components/Panel';
import { useConsumer } from '@website/hooks/consumer';
import {Footer as WebsiteFooter } from '@ui/components/Footer';

export const UserInfo = () => {
  const attributes = useConsumer();
  const user = first(attributes?.data);

  return (
    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className="user-panel">
      <Panel
        style={{
          padding: '16px',
          height: '250px',
          justifyContent: 'center',
          position: 'sticky',
          top: '66px',
        }}
      >
        <Grid container justifyContent={'center'} flex={1} spacing={2}>
          <Avatar className="avatar-icon">{user?.name.charAt(0)}</Avatar>
        </Grid>
        <Grid container justifyContent={'center'} flex={1} spacing={2}>
          <h4 style={{ textAlign: 'center', width: '100%' }}>{user?.name}</h4>
          <p>{user?.email}</p>
        </Grid>
      </Panel>
      <Panel
        style={{
          padding: 0,
          justifyContent: 'center',
          margin: '0 auto',
          position: 'sticky',
          top: '330px',
        }}
      >
        <WebsiteFooter
          prefix={() => <>Powered by</>}
          suffix={() => <>&copy; {new Date().getFullYear()}</>}
          linkText="Postbox"
          linkURL="https://digitalbit.in"
        />
      </Panel>
    </Grid>
  );
};

export default UserInfo;
