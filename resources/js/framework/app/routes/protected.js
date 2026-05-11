import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "@app/utils";
import { api } from "@app/constants";

export const ProtectedRoute = ({ restricted, ...rest }) => {
    const adminUrl = api.adminPrefix;
    return !isLogin() && restricted ? (
        <Route {...rest} />
    ) : (
        <Redirect to={adminUrl} />
    );
};