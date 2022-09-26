import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import {isLogin} from '../libs/login';
import { api } from '../libs/vars';

const ProtectedRoute = ({restricted, ...rest}) => {
    const adminUrl = api.adminPrefix;
    return (!isLogin() && restricted ?
        <Route {...rest}/>
        : <Redirect to={adminUrl} />
    );
}

export default ProtectedRoute;
