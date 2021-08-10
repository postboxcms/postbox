import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Dashboard from '../components/Dashboard/Dashboard';
import Home from '../components/Home';
import Pages from '../components/Pages';
import Posts from '../components/Posts';
import Users from '../components/Users';

// theme provider
import { theme } from './theme';

 /** React router to setup UI routes */
const Admin = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Dashboard title="Dashboard" component={Home}/>
                </Route>
                <Route path="/posts">
                    <Dashboard title="Posts" component={Posts} />
                </Route>
                <Route path="/post/add">
                    <Dashboard title="Add Post" mode="add" component={Posts} />
                </Route>
                <Route path="/pages">
                    <Dashboard title="Pages" component={Pages} />
                </Route>
                <Route path="/users">
                    <Dashboard title="Users" component={Users} />
                </Route>
            </Switch>
        </Router>
    );
}

export default Admin;

if (document.getElementById('app')) {
    ReactDOM.render((
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Admin />
            </BrowserRouter>
        </MuiThemeProvider>
    ), document.getElementById('app'));
}
