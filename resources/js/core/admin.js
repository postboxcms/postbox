import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
// layout
import Frameset from './ui/layout/Frameset';
// core modules
import Dashboard from './modules/Dashboard';
import Login from './modules/Login';
import ContentType from './modules/ContentType';
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
                    <Frameset title="Posts" path="/posts" controller={ContentType} />
                </PrivateRoute>
                <PrivateRoute path="/pages">
                    <Frameset title="Pages" path="/pages" controller={ContentType} />
                </PrivateRoute>
                <PrivateRoute path="/users">
                    <Frameset title="Users" path="/users" controller={ContentType} />
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
