import React from 'react';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Panel from '@ui/components/Panel';
import { useConsumer } from '@website/hooks/consumer';
import { Icon } from '@ui/elements/Icon';

export const MenuBar = () => {
  const attributes = useConsumer();

  return (
    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
      <Panel className="menu-bar" style={{ padding: 0, justifyContent: 'center' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton className='menu-button'>
                <ListItemIcon>
                  <Icon name="fa-home" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        {/* <p>{attributes}</p> */}
      </Panel>
    </Grid>
  );
};

export default MenuBar;
