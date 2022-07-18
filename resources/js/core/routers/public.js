import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import {isLogin} from '../libs/login';

const PublicRoute = ({restricted, ...rest}) => {
    return (!isLogin() && restricted ?
        <Route {...rest}/>
        : <Redirect to="/" />
    );
}
// const PublicRoute = ({restricted, ...rest}) => {
//     return isLogin().then((response) => {
//         return (
//             <Redirect to="/login"/>
//         );
//     }).catch((error) => {
//         return (
//             <Route {...rest} />
//         );
//     });
// }

export default PublicRoute;
