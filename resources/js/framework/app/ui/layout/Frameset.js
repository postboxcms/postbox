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
// app elements
import { MainItems, SubItems } from '../navigation';
import Breadcrumb from '../components/Breadcrumb';
import TopMenu from './TopMenu';

import { useLayoutCSS } from '@app/hooks/layout';
import { theme } from '@app/init/theme';
import { getNavOpen, setNavOpen } from '@modules/Settings/reducers/platform';
import { getUser } from '@modules/Auth/reducers/jwt';

import LogoFull from '@root/art/logo-full.svg';
import Logo from '@root/art/logo.svg';
import Footer from '@ui/components/Footer';
import { platform } from '@app/utils/constants';

export default function Frameset(props) {
    const classes = useLayoutCSS();
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
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{user?.name.charAt(0)}</Avatar>
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
                    {open && (<img src={LogoFull} width={"150px"} />)}
                    {!open && (<img src={Logo} width={"30px"} />)}

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
                            prefix={"Crafting with \u2764 at "} 
                            suffix={" since " + platform.companyYear} 
                            linkText={platform.company}
                            linkURL={platform.companyURL}/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}
