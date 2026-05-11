import React from "react";
import { Route, Redirect } from "react-router-dom";
import { api } from "@app/constants";
import { isLogin } from "@app/utils";

export const PrivateRoute = ({ ...rest }) => {
    const loginUrl = api.adminPrefix + api.loginUrl;
    return isLogin() ? <Route {...rest} /> : <Redirect to={loginUrl} />;
};