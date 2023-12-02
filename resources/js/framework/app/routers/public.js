import React from 'react';
import { Route } from 'react-router-dom';
import { createBrowserHistory } from "history";

const PublicRoute = ({filter, ...rest}) => {
    let browserHistory = createBrowserHistory();
    if(!browserHistory.location.pathname.startsWith(filter)) {
        return <Route {...rest}/>;
    }
    return <></>;
}

export default PublicRoute;
