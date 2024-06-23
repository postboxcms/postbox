import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
// layout
import Frameset from "./ui/layout/Frameset";
import Website from "./ui/layout/Website";
// core modules
import Auth from "./modules/Auth";
import ContentType from "./modules/ContentType";
import AddEditContent from "./modules/ContentType/components/AddEdit";
import Theme from "../website";
// routes
import { PrivateRoute, ProtectedRoute, PublicRoute } from './routes';
// variables
import { api } from "./utils";
// route manager
import { adminRoutes, authRoutes, contentTypeRoutes } from "./routes/data";
// store
import { store, persistor } from "./store";

/** React router to setup UI routes */
const Template = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router history={history}>
                        {/* public routes */}
                        {authRoutes.map((route) => {
                            return Object.keys(route).map((type, key) => {
                                const routename = route[type];
                                return (
                                    <Switch key={key}>
                                        {routename.type == "protected" &&
                                            <ProtectedRoute
                                                restricted={true}
                                                exact
                                                path={routename.path}
                                            >
                                                <Auth mode={routename.mode} />
                                            </ProtectedRoute>
                                        }
                                        {routename.type == "public" &&
                                            <PublicRoute
                                                exact
                                                path={routename.path}
                                            >
                                                <Auth mode={routename.mode} />
                                            </PublicRoute>
                                        }

                                    </Switch>
                                )
                            });
                        })}
                        {/* admin private routes */}
                        {adminRoutes.map((route) => {
                            return Object.keys(route).map((type, key) => {
                                const routename = route[type];
                                return (
                                    <Switch key={key}>
                                        <PrivateRoute exact path={routename.path}>
                                            <Frameset
                                                title={routename.title}
                                                path={routename.path}
                                                controller={routename.controller} />
                                        </PrivateRoute>
                                    </Switch>
                                );
                            });
                        })}
                        {/* content_type routes */}
                        {contentTypeRoutes.map((routes) => {
                            return Object.keys(routes).map((type, key) => {
                                const route = routes[type];
                                return (
                                    <Switch key={key}>
                                        <PrivateRoute
                                            path={
                                                api.adminPrefix +
                                                "/" +
                                                route.name + "/list"
                                            }
                                        >
                                            <Frameset
                                                title={route.title}
                                                path={"/" + route.name}
                                                controller={ContentType}
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
                                                path={
                                                    "/" +
                                                    route.name +
                                                    "/add"
                                                }
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
                                                path={
                                                    api.adminPrefix +
                                                    "/" +
                                                    route.name +
                                                    "/edit"
                                                }
                                                controller={AddEditContent}
                                            />
                                        </PrivateRoute>
                                    </Switch>
                                );
                            });
                        })}
                        <Switch>
                            <PublicRoute
                                restricted={true}
                                filter={api.adminPrefix}
                                path="*"
                            >
                                <Website controller={Theme} />
                            </PublicRoute>
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        </React.StrictMode>
    );
};

export default Template;