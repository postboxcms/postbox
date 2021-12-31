import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import Frameset from '../components/ui/Frameset';

import Dashboard from '../components/Dashboard';
import Login from '../components/Login';

import Pages from '../components/Pages';
import Posts from '../components/Posts';
import Users from '../components/Users';

// theme provider
import { theme } from './theme';

// routers
import PrivateRoute from './routers/private';
import PublicRoute from './routers/public';

/** React router to setup UI routes */
const Admin = () => {
    return (
        <Router>
            <Switch>
                <PublicRoute restricted={true} exact path="/login">
                    <Login/>
                </PublicRoute>
                <PrivateRoute exact path="/">
                    <Frameset title="Dashboard" controller={Dashboard} />
                </PrivateRoute>
                <PrivateRoute path="/posts">
                    <Frameset title="Posts" controller={Posts} />
                </PrivateRoute>
                <PrivateRoute path="/post/add">
                    <Frameset title="Add Post" mode="add" controller={Posts} />
                </PrivateRoute>
                <PrivateRoute path="/pages">
                    <Frameset title="Pages" controller={Pages} />
                </PrivateRoute>
                <PrivateRoute path="/users">
                    <Frameset title="Users" controller={Users} />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default Admin;

if (document.getElementById('app')) {
    ReactDOM.render((
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Admin />
            </ThemeProvider>
        </StyledEngineProvider>
    ), document.getElementById('app'));
}
