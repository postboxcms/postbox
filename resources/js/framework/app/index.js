import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
// layout
import Frameset from "./layout/layout/Frameset";
import Website from "./layout/layout/Website";
// core modules
import Auth from "./modules/Auth";
import ContentType from "./modules/ContentType";
import Theme from "../website/Theme";
// theme provider
import { theme } from "./theme";
// routers
import ProtectedRoute from "./routers/protected";

import PrivateRoute from "./routers/private";
import PublicRoute from "./routers/public";
// variables
import { api } from "./utils/constants";
// route manager
import contentTypeRoutes from "../routes/contentTypeRoutes";
import adminRoutes from "../routes/adminRoutes";
import authRoutes from "../routes/authRoutes";
// store
import { store, persistor } from "./store";
import history from "./utils/history";

/** React router to setup UI routes */
const Admin = () => {
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
                                                path={routename.path}
                                                controller={routename.controller} />
                                        </PrivateRoute>
                                    </Switch>
                                );
                            });
                        })}
                        {/* content_type routes */}
                        {contentTypeRoutes.map((route) => {
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
