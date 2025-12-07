import React from 'react';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Panel from '@ui/components/Panel';
import { useConsumer } from '@website/hooks/consumer';
import { Icon } from '@ui/elements/Icon';

export const MenuBar = () => {
  const attributes = useConsumer();

  return (
    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
      <Panel style={{ padding: '16px', justifyContent: 'center' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton className='menu-button'>
                <ListItemIcon>
                  <Icon name="fa-home" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
              {/* {attributes && attributes.length > 0 && (
                <List component="div" disablePadding>
                  {/* {attributes.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ pl: 4 }}>
                      <ListItemButton className='menu-button'>
                        <ListItemIcon>
                          <Icon name="fa-file-alt" />
                        </ListItemIcon>
                        <ListItemText primary={item.title || `Item ${index + 1}`} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )} */}
            </ListItem>
          </List>
        </nav>
        {/* <p>{attributes}</p> */}
      </Panel>
    </Grid>
  );
};

export default MenuBar;
