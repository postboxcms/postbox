import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useLayoutCSS } from '../app/hooks/layout';
import { getWebsiteName } from '../app/modules/Settings/reducers/site';

const Theme = (props) => {
    const classes = useLayoutCSS();
    const websiteName = useSelector(getWebsiteName);

    return (
        <div className="content">
            <AppBar position="absolute" className={clsx(classes.appBar, open)}>
                <Toolbar className="toolbar">
                    <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
                        {websiteName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className="content">
                <div className="appbar-spacer" />
                <Container maxWidth="lg" className="container">
                    {/* shift the above code to Theme and render the theme as a module through Website layout */}
                    Theme content goes here...
                </Container>
            </main>
        </div>
    );
}

export default Theme;
