import React from 'react';
import clsx from 'clsx';
// elements
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
// icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
// app elements
import { MainItems, SubItems } from '../navigation/Navigation';
import Breadcrumb from '../elements/Breadcrumb';
// styles and css
import { LayoutCSS } from './layout.css';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://digitalbit.in" underline="hover">
                Digitalbit Labs
            </Link>{' '}
            {new Date().getFullYear()}
            {/* {'.'} */}
        </Typography>
    );
}

export default function Frameset(props) {
    const classes = LayoutCSS();
    const [open, setOpen] = React.useState(true);
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const renderComponent = (props) => {
        const GridComponent = props.controller;
        const apiUrl = process.env.MIX_APP_URL;
        return (
            <GridComponent api={apiUrl} {...props} />
        );
    };

    return (
        <div className="app-root">
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className="toolbar">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        size="large">
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
                        <Breadcrumb title={props.title} />
                        {/* {props.title} */}
                    </Typography>
                    <IconButton color="inherit" size="large">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: (clsx(classes.drawerPaper, !open && classes.drawerPaperClose)) + ' navbar-dark',
                }}
                open={open}
            >
                <div className="toolbar-icon">
                    <IconButton onClick={handleDrawerClose} size="large">
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{MainItems(classes)}</List>
                <Divider />
                <List>{SubItems(classes)}</List>
            </Drawer>
            <main className="content">
                <div className="appbar-spacer" />
                <Container maxWidth="lg" className="container">
                    {renderComponent(props)}
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}
