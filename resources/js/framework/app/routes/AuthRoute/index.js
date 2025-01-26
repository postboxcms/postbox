import React from 'react';
import { Switch } from 'react-router-dom';

import Auth from "@modules/Auth";
import { ProtectedRoute, PublicRoute } from "@app/routes";

import { routes } from "./routes";

const AuthRoutes = () => {
    return routes.map((route) => {
        return Object.keys(route).map((type, key) => {
            const routename = route[type];
            return (
                <Switch key={key}>
                    {routename.type == "protected" && (
                        <ProtectedRoute
                            restricted={true}
                            exact
                            path={routename.path}
                        >
                            <Auth
                                mode={routename.mode}
                            />
                        </ProtectedRoute>
                    )}
                    {routename.type == "public" && (
                        <PublicRoute
                            exact
                            path={routename.path}
                        >
                            <Auth
                                mode={routename.mode}
                            />
                        </PublicRoute>
                    )}
                </Switch>
            );
        });
    })
};

export default AuthRoutes;