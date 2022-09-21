import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
// layout
import Frameset from './ui/layout/Frameset';
import Website from './ui/layout/Website';
// core modules
import Dashboard from './modules/Dashboard';
import Login from './modules/Login';
import ContentType from './modules/ContentType';
import CRUD from './modules/CRUD';
import Theme from '../website/Theme';
// theme provider
import { theme } from './theme';
// routers
import PrivateRoute from './routers/private';
import PublicRoute from './routers/public';
// variables
import {api} from './libs/vars';

/** React router to setup UI routes */
const Admin = () => {
    return (
        <Router>
            <Switch>
                <PublicRoute restricted={true} exact path={api.adminPrefix+"/login"}>
                    <Login/>
                </PublicRoute>
                <PrivateRoute exact path={api.adminPrefix}>
                    <Frameset path={api.adminPrefix} controller={Dashboard} />
                </PrivateRoute>
                <PrivateRoute path={api.adminPrefix+"/posts"}>
                    <Frameset title="Posts" path="/posts" controller={ContentType} />
                </PrivateRoute>
                <PrivateRoute path={api.adminPrefix+"/pages"}>
                    <Frameset title="Pages" path="/pages" controller={ContentType} />
                </PrivateRoute>
                <PrivateRoute path={api.adminPrefix+"/users"}>
                    <Frameset title="Users" path="/users" controller={ContentType} />
                </PrivateRoute>
                <PrivateRoute path={api.adminPrefix+"/crud"}>
                    <Frameset title="CRUD" icon="layer-group" controller={CRUD} />
                </PrivateRoute>
                <PrivateRoute path="*">
                    <Website controller={Theme} />
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
