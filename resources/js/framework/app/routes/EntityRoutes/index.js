import React from 'react';
import { Switch } from 'react-router-dom';

import { PrivateRoute } from "@app/routes";
import { api } from "@app/utils";

import { Entity, AddEditContent } from "@modules/Entity";
import Frameset from "@ui/layout/Frameset";

import { useEntityRoutes } from './routes';

const EntityRoutes = () => {
    const routes = useEntityRoutes();
    
    return routes?.map((routes) => {
        return Object.keys(routes).map((type, key) => {
            const route = routes[type];
            return (
                <Switch key={key}>
                    <PrivateRoute
                        path={
                            api.adminPrefix +
                            "/" +
                            route.name +
                            "/list"
                        }
                    >
                        <Frameset
                            title={route.title}
                            path={"/" + route.name}
                            controller={Entity}
                        />
                    </PrivateRoute>
                    <PrivateRoute
                        path={
                            api.adminPrefix +
                            "/" +
                            route.name +
                            "/add"
                        }
                    >
                        <Frameset
                            title={route.title}
                            type={route.entity}
                            path={
                                "/" +
                                route.name +
                                "/add"
                            }
                            query="add"
                            controller={AddEditContent}
                        />
                    </PrivateRoute>
                    <PrivateRoute
                        path={
                            api.adminPrefix +
                            "/" +
                            route.name +
                            "/edit"
                        }
                    >
                        <Frameset
                            title={route.title}
                            type={route.entity}
                            path={
                                api.adminPrefix +
                                "/" +
                                route.name +
                                "/edit"
                            }
                            query="edit"
                            controller={AddEditContent}
                        />
                    </PrivateRoute>
                </Switch>
            );
        });
    });
};

export default EntityRoutes;