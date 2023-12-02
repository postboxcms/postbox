import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../libs/login";
import { api } from "../libs/constants";

const PrivateRoute = ({ ...rest }) => {
    const loginUrl = api.adminPrefix + api.loginUrl;
    return isLogin() ? <Route {...rest} /> : <Redirect to={loginUrl} />;
};

export default PrivateRoute;
