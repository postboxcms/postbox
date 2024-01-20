import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/login";
import { api } from "../utils/constants";

export const ProtectedRoute = ({ restricted, ...rest }) => {
    const adminUrl = api.adminPrefix;
    return !isLogin() && restricted ? (
        <Route {...rest} />
    ) : (
        <Redirect to={adminUrl} />
    );
};