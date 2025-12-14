import React from 'react';
import { first } from 'lodash';
import { Avatar, Grid } from '@mui/material';
import Panel from '@ui/components/Panel';
import { useConsumer } from '@website/hooks/consumer';

export const UserInfo = () => {
  const attributes = useConsumer();
  const user = first(attributes?.data);

  return (
    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className="user-panel">
      <Panel style={{ padding: '16px', justifyContent: 'center', position: 'sticky', top: '66px' }}>
        <Grid container justifyContent={'center'} flex={1} spacing={2}>
          <Avatar className="avatar-icon">{user?.name.charAt(0)}</Avatar>
        </Grid>
        <Grid container justifyContent={'center'} flex={1} spacing={2}>
          <h4 style={{ textAlign: 'center', width: '100%' }}>{user?.name}</h4>
          <p>{user?.email}</p>
        </Grid>
      </Panel>
    </Grid>
  );
};

export default UserInfo;
