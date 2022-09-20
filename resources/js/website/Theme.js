import React from 'react';
import clsx from 'clsx';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { LayoutCSS } from './../core/ui/layout/layout.css';
import { Card, Frame, Body } from './../core/ui/layout/Frame';

export default function Theme(props) {
    const classes = LayoutCSS();
    const renderComponent = (props) => {
        const GridComponent = props.controller;
        return (
            <Frame>
                <Card xs={12}>
                    <GridComponent {...props} />
                </Card>
            </Frame>
        );
    };

    return (
        <div className="content">
            <AppBar position="absolute" className={clsx(classes.appBar, open)}>
                <Toolbar className="toolbar">
                    <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
                        {"{minimalist}"}
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className="content">
                <div className="appbar-spacer" />
                <Container maxWidth="lg" className="container">
                    {/* shift the above code to Theme and render the theme as a module through Website layout */}
                    {renderComponent(props)}
                </Container>
            </main>
        </div>
    );
}
