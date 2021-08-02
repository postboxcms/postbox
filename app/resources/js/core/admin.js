import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Dashboard from '../components/Dashboard/Dashboard';
import Home from '../components/Home';
import Videos from '../components/Videos';
import Channels from '../components/Channels';
import Subscribers from '../components/Subscribers';

const THEME = createMuiTheme({
    typography: {
     "fontFamily": `"Segoe UI", "Helvetica", "Arial", sans-serif`,
     "fontSize": 14,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    }
 });
const Admin = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Dashboard title="Dashboard" component={Home}/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard title="Dashboard" />
                </Route>
                <Route path="/videos">
                    <Dashboard title="Videos" component={Videos} />
                </Route>
                <Route path="/channels">
                    <Dashboard title="Channels" component={Channels} />
                </Route>
                <Route path="/subscribers">
                    <Dashboard title="Subscribers" component={Subscribers} />
                </Route>

            </Switch>
        </Router>
    );
}

export default Admin;

if (document.getElementById('app')) {
    ReactDOM.render((
        <MuiThemeProvider theme={THEME}>
            <BrowserRouter>
                <Admin />
            </BrowserRouter>
        </MuiThemeProvider>
    ), document.getElementById('app'));
}
