import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
// layout
import Frameset from "./ui/layout/Frameset";
import Website from "./ui/layout/Website";
// core modules
import Dashboard from "./modules/Dashboard";
import Auth from "./modules/Auth";
import ContentType from "./modules/ContentType";
import CRUD from "./modules/CRUD";
import Theme from "../website/Theme";
// theme provider
import { theme } from "./theme";
// routers
import ProtectedRoute from "./routers/protected";

import PrivateRoute from "./routers/private";
import PublicRoute from "./routers/public";
// variables
import { api } from "./libs/constants";
// route manager
import routeManager from "../routes";
// store
import { store } from "./store";
import history from "./libs/history";

/** React router to setup UI routes */
const Admin = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <Router history={history}>
                    {/* public routes */}
                    <Switch>
                        <ProtectedRoute
                            restricted={true}
                            exact
                            path={api.adminPrefix + api.loginUrl}
                        >
                            <Auth />
                        </ProtectedRoute>
                        <PublicRoute
                            exact
                            path={api.adminPrefix + api.logoutUrl}
                        >
                            <Auth mode="logout" />
                        </PublicRoute>
                        <PublicRoute
                            restricted={true}
                            filter={api.adminPrefix}
                            path="*"
                        >
                            <Website controller={Theme} />
                        </PublicRoute>
                    </Switch>
                    {/* admin private routes */}
                    <Switch>
                        <PrivateRoute exact path={api.adminPrefix}>
                            <Frameset
                                path={api.adminPrefix}
                                controller={Dashboard}
                            />
                        </PrivateRoute>
                        <PrivateRoute path={api.adminPrefix + "/crud"}>
                            <Frameset
                                title="CRUD"
                                icon="layer-group"
                                controller={CRUD}
                            />
                        </PrivateRoute>
                    </Switch>
                    {/* content_type routes */}
                    {routeManager.list.map((route) => {
                        return Object.keys(route).map((type, key) => {
                            const routename = route[type];
                            return (
                                <Switch key={key}>
                                    <PrivateRoute
                                        path={
                                            api.adminPrefix +
                                            "/" +
                                            routename.plural
                                        }
                                    >
                                        <Frameset
                                            title={routename.title}
                                            path={"/" + routename.plural}
                                            controller={ContentType}
                                        />
                                    </PrivateRoute>
                                    <PrivateRoute
                                        path={
                                            api.adminPrefix +
                                            "/" +
                                            routename.singular +
                                            "/add"
                                        }
                                    >
                                        <Frameset
                                            title={routename.title}
                                            path={
                                                "/" +
                                                routename.singular +
                                                "/add"
                                            }
                                            controller={ContentType}
                                        />
                                    </PrivateRoute>
                                    <PrivateRoute
                                        path={
                                            api.adminPrefix +
                                            "/" +
                                            routename.singular +
                                            "/edit"
                                        }
                                    >
                                        <Frameset
                                            title={routename.title}
                                            path={
                                                "/" +
                                                routename.singular +
                                                "/edit"
                                            }
                                            controller={ContentType}
                                        />
                                    </PrivateRoute>
                                </Switch>
                            );
                        });
                    })}
                </Router>
            </Provider>
        </React.StrictMode>
    );
};

export default Admin;

if (document.getElementById("app")) {
    ReactDOM.render(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Admin />
            </ThemeProvider>
        </StyledEngineProvider>,
        document.getElementById("app")
    );
}
