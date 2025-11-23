import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';

import { useCSS, useAuth } from '@app/hooks';
import {
  getWebsiteLogo,
  getWebsiteName,
  getWebsiteStatus,
  getWebsiteTitle,
  getWebsiteTheme,
  updateSettings,
} from '@modules/Settings/reducers/site';
import { getThemeCollection } from '@modules/Settings/reducers/platform';

import IOSSwitch from '@ui/elements/IOSSwitch';
import Title from '@ui/elements/Title';
import Input from '@ui/elements/Input';
import SaveButton from '@ui/elements/SaveButton';
import ImageUploader from '@ui/components/ImageUploader';
import Panel from '@ui/components/Panel';
import Form from '@ui/components/Form';

const Body = (props) => {
  const [title, setTitle] = React.useState('');
  const [name, setName] = React.useState('');
  const [isProductionReady, setIsProductionReady] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [selectedTheme, setSelectedTheme] = React.useState(null);

  const websiteLogo = useSelector(getWebsiteLogo);
  const websiteName = useSelector(getWebsiteName);
  const websiteTitle = useSelector(getWebsiteTitle);
  const websiteStatus = useSelector(getWebsiteStatus);
  const websiteTheme = useSelector(getWebsiteTheme);
  const websiteAvailableThemes = useSelector(getThemeCollection);

  const { token } = useAuth();
  const dispatch = useDispatch();
  const classes = useCSS();
  const pageIcon = 'gear';

  const getThemes = () => {
    // renderThemes();
    console.log('window.themes:', websiteAvailableThemes);
    return websiteAvailableThemes || [];
  };

  const saveSettings = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('token', token);
    data.append('endpoint', 'settings');
    const settings = [
      {
        property: 'name',
        value: name,
        type: 'string',
      },
      {
        property: 'title',
        value: title,
        type: 'string',
      },
      {
        property: 'isProductionReady',
        value: Number(isProductionReady),
        type: 'string',
      },
      {
        property: 'siteLogo',
        value: image,
        type: 'file',
      },
      {
        property: 'theme',
        value: selectedTheme,
        type: 'string',
      },
    ];

    settings.forEach((item) => {
      if (item.value || item.property === 'isProductionReady') {
        data.append(item.property, item.value);
      }
    });
    // Handle form submission
    dispatch(updateSettings(data));
  };

  React.useEffect(() => {
    setName(websiteName);
    setTitle(websiteTitle);
    setIsProductionReady(websiteStatus);
    setSelectedTheme(websiteTheme);
  }, []);

  return (
    <React.Fragment>
      <div className={`${classes.heading} ${classes.header}`}>
        <Title icon={pageIcon}>{props['title'] ? props['title'] : props['name']}</Title>
      </div>
      <Panel style={{ padding: '16px', margin: 'auto' }} className={classes.panel}>
        <Form onSubmit={saveSettings}>
          <Grid container spacing={2} maxWidth="600px">
            {/* Column for labels */}
            <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
              <Typography variant="body1" align="right">
                Website Name
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                name="name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
              <Typography variant="body1" align="right">
                Website Title
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                name="title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
              <Typography variant="body1" align="right">
                Website Live?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <IOSSwitch
                checked={isProductionReady}
                onChange={(e) => setIsProductionReady(e.target.checked)}
              />
            </Grid>

            <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
              <Typography variant="body1" align="right">
                Website theme
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                name="theme"
                type="dropdown"
                value={selectedTheme}
                defaultValue={selectedTheme}
                onChange={(e) => {
                  setSelectedTheme(e.target.value);
                }}
                options={getThemes()}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
              <Typography variant="body1" align="right">
                Website logo
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ImageUploader
                placeholder={'/uploads/settings/' + websiteLogo}
                uploadImage={(file) => setImage(file)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: '1px' }} maxWidth="600px">
            <Grid
              item
              xs={12}
              sm={6}
              container
              justifyContent="flex-end"
              alignItems="center"
            ></Grid>
            <Grid item xs={12} sm={6}>
              <SaveButton />
            </Grid>
          </Grid>
        </Form>
      </Panel>
    </React.Fragment>
  );
};

export default Body;
