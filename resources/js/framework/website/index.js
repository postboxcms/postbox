import React from 'react';
import clsx from 'clsx';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { LayoutCSS } from '../app/layout/layout/layout.css';

const Theme = (props) => {
    const classes = LayoutCSS();
    return (
        <div className="content">
            <AppBar position="absolute" className={clsx(classes.appBar, open)}>
                <Toolbar className="toolbar">
                    <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
                        {"[minimalist]"}
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
