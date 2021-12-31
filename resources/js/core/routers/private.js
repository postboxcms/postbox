import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isLogin} from '../libs/login';

const PrivateRoute = ({ ...rest}) => {
    return (isLogin() ?
        <Route {...rest} />
    :<Redirect to="/login"/>);
}

export default PrivateRoute;
