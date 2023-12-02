import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/login";
import { api } from "../utils/constants";

const PrivateRoute = ({ ...rest }) => {
    const loginUrl = api.adminPrefix + api.loginUrl;
    return isLogin() ? <Route {...rest} /> : <Redirect to={loginUrl} />;
};

export default PrivateRoute;
