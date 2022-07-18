import React, { useState } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isLogin} from '../libs/login';

const PrivateRoute = ({ ...rest}) => {
    return (isLogin() ?
        <Route {...rest} />
    :<Redirect to="/login"/>);
}
// const PrivateRoute = ({ ...rest}) => {
//     return isLogin().then((response) => {
//         return (
//             response?<Route {...rest} />:<Redirect to="/login"/>
//         );
//     }).catch((error) => {
//         return (
//             <Redirect to="/login"/>
//         );
//     });
// }


export default PrivateRoute;
