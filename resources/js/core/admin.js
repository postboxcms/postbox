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
import ProtectedRoute from './routers/protected';

import PrivateRoute from './routers/private';
import PublicRoute from './routers/public';
// variables
import { api } from './libs/vars';
// route manager
import routeManager from '../routes';

/** React router to setup UI routes */
const Admin = () => {
    return (
        <Router>
            <Switch>
                <ProtectedRoute restricted={true} exact path={api.adminPrefix + api.loginUrl}>
                    <Login />
                </ProtectedRoute>
                <PublicRoute restricted={true} filter={api.adminPrefix} path="*">
                    <Website controller={Theme} />
                </PublicRoute>
            </Switch>
            <Switch>
                <PrivateRoute exact path={api.adminPrefix}>
                    <Frameset path={api.adminPrefix} controller={Dashboard} />
                </PrivateRoute>
                <PrivateRoute path={api.adminPrefix + "/crud"}>
                    <Frameset title="CRUD" icon="layer-group" controller={CRUD} />
                </PrivateRoute>
            </Switch>
            {routeManager.list.map((route) => {
                return Object.keys(route).map((type, key) => {
                    const routename = route[type];
                    return (
                        <Switch key={key}>
                            <PrivateRoute path={api.adminPrefix + "/" + routename.plural}>
                                <Frameset title={routename.title} path={"/" + routename.plural} controller={ContentType} />
                            </PrivateRoute>
                            <PrivateRoute path={api.adminPrefix + "/" + routename.singular + "/add"}>
                                <Frameset title={routename.title} path={"/" + routename.singular + '/add'} controller={ContentType} />
                            </PrivateRoute>
                            <PrivateRoute path={api.adminPrefix + "/" + routename.singular + "/edit"}>
                                <Frameset title={routename.title} path={"/" + routename.singular + '/edit'} controller={ContentType} />
                            </PrivateRoute>
                        </Switch>
                    )
                });
            })}
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
