import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import {isLogin} from '../libs/login';

const PublicRoute = ({restricted, ...rest}) => {
    return (!isLogin() ?
        <Route {...rest}/>
        : <Redirect to="/" />
    );
}

export default PublicRoute;
