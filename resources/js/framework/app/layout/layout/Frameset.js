import React from 'react';
import { useSelector } from 'react-redux';
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
import Breadcrumb from '../elements/Breadcrumb';
import Copyright from '../elements/Copyright';
// styles and css
import { LayoutCSS } from './layout.css';
// libs
import jwt from '../../utils/cookies';
import { getUser } from '../../store/jwt';
// menu
import TopMenu from './TopMenu';

export default function Frameset(props) {
    const classes = LayoutCSS();
    const user = useSelector(getUser);
    const [anchor, setAnchor] = React.useState(null);
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
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
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const renderComponent = (props) => {
        const GridComponent = props.controller;
        return (
            <GridComponent {...props} />
        );
    };
    // const user = JSON.parse(jwt.getToken(api.userToken));

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
                    </Typography>
                    <IconButton color="inherit" size="large" onClick={switchTopMenu}>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>{user?.name.charAt(0)}</Avatar>
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
