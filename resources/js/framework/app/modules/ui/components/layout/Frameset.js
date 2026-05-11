import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Container from '@mui/material/Container';
// icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { platform } from '@app/constants';
import {  useAppCSS } from '@app/hooks';
import { admin } from '@app/init/theme';
import { getNavOpen, setNavOpen } from '@modules/settings/reducers/platform';
import { getUser } from '@modules/auth/reducers/user';

// app elements
import { MainItems, SubItems } from '@ui/components/navigation';
import Breadcrumb from '@ui/components/Breadcrumb';

import Footer from '@ui/components/Footer';
import Logo from '@ui/components/elements/Logo';
import Icon from '@ui/components/elements/Icon';
import TopMenu from '@ui/components/layout/TopMenu';

export default function Frameset(props) {
    const classes = useAppCSS();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const isNavOpen = useSelector(getNavOpen);
    const [anchor, setAnchor] = React.useState(null);
    const [open, setOpen] = React.useState(isNavOpen);

    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(setNavOpen(!open));
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const updateState = (anchor) => {
        setAnchor(anchor);
    }
    const switchTopMenu = (event) => {
        if(!Boolean(anchor)) {
            setAnchor(event.currentTarget);
        } else {
            setAnchor(null)
        }
    };
    const renderComponent = (props) => {
        const GridComponent = props.controller;
        return (
            <GridComponent {...props} />
        );
    };

    return (
        <div className="app-root">
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={clsx(classes.appToolbar, open && classes.appToolbarShift)}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        // className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        className={classes.menuButton}
                        size="large">
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
                        <Breadcrumb title={props.title} />
                    </Typography>
                    <IconButton color="inherit" size="large" onClick={switchTopMenu}>
                        <Avatar sx={{ bgcolor: admin.palette.primary.main }}>{user?.name.charAt(0)}</Avatar>
                    </IconButton>
                    <TopMenu anchor={anchor} state={updateState}/>
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
                    {open && (<Logo mode="dark" variant="full" />)}
                    {!open && (<Logo />)}

                    {/* <IconButton onClick={handleDrawerClose} size="large">
                        <ChevronLeftIcon />
                    </IconButton> */}
                </div>
                <Divider />
                <List>{<MainItems {...classes} />}</List>
                <Divider />
                <List>{<SubItems {...classes} />}</List>
            </Drawer>
            <main className="content">
                <div className="appbar-spacer" />
                <Container maxWidth="lg" className="container">
                    {renderComponent(props)}
                    <Box pt={2}>
                        <Footer 
                            prefix={() => <>Crafting with <Icon name="fa-heart" size="sm" color={admin.palette.primary.main} /> at </>} 
                            suffix={() => " since " + platform.companyYear} 
                            linkText={platform.company}
                            linkURL={platform.companyURL}/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}
