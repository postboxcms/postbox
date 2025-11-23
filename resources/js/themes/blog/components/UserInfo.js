import React from 'react';
import { Grid } from '@mui/material';
import Panel from '@ui/components/Panel';

const UserInfo = ({ message }) => (
  <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
    <Panel style={{ padding: '16px', justifyContent: 'center' }}>
      <p>{message}</p>
    </Panel>
  </Grid>
);

export default UserInfo;
