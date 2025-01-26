import React from "react";
import { Switch } from "react-router-dom";

import { PrivateRoute } from "@app/routes";
import Frameset from "@ui/layout/Frameset";

import { routes } from "./routes";

const AdminRoutes = () => {
    return routes.map((route) => {
        return Object.keys(route).map((type, key) => {
            const routename = route[type];
            return (
                <Switch key={key}>
                    <PrivateRoute exact path={routename.path}>
                        <Frameset
                            title={routename.title}
                            path={routename.path}
                            controller={routename.controller}
                        />
                    </PrivateRoute>
                </Switch>
            );
        });
    });
};

export default AdminRoutes;
