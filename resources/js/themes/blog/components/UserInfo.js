import React from 'react';
import { first } from 'lodash';
import { Avatar, Grid } from '@mui/material';
import Panel from '@ui/components/Panel';
import { useConsumer } from '@website/hooks/consumer';

export const UserInfo = () => {
  const attributes = useConsumer();
  const user = first(attributes?.data);

  return (
    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
      <Panel style={{ padding: '16px', justifyContent: 'center' }}>
        <Grid container justifyContent={'center'} flex={1} spacing={2}>
          <Avatar className="avatar-icon">{user?.name.charAt(0)}</Avatar>
        </Grid>
        <Grid container justifyContent={'center'} flex={1} spacing={2}>
          <h4>{user?.name}</h4>
        </Grid>
      </Panel>
    </Grid>
  );
};

export default UserInfo;
