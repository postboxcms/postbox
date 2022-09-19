import React from 'react';
import clsx from 'clsx';
// elements
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// app elements
import WebsiteFooter from '../elements/WebsiteFooter';
// styles and css
import { LayoutCSS } from './layout.css';
import { Card, Frame, Body } from './Frame';

export default function Website(props) {
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
        <div className="app-root">
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open)}>
                <Toolbar className="toolbar">
                    <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
                        {/* <Breadcrumb title={props.title} /> */}
                        {"{{minimalist}}"}
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className="content">
                <div className="appbar-spacer" />
                <Container maxWidth="lg" className="container">
                    {renderComponent(props)}
                    <Box pt={4}>
                        <WebsiteFooter />
                    </Box>
                </Container>
            </main>
        </div>
    );
}
