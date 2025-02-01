import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Theme } from "@website";
// routes
import { PublicRoute } from "@app/routes";
// variables
import { api } from "@app/utils";
// store
import { store, persistor } from "@app/store";
// layout
import Frameset from "@ui/layout/Frameset";
import Website from "@ui/layout/Website";
// core modules
import DataProvider from "@providers/DataProvider";

import AuthRoutes from "@app/routes/AuthRoute";
import AdminRoutes from "@app/routes/AdminRoutes";
import EntityRoutes from "@app/routes/EntityRoutes";

/** React router to setup UI routes */
const Engine = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <DataProvider>
                        <Router history={history}>
                            {/* public routes */}
                            <AuthRoutes />
                            {/* admin private routes */}
                            <AdminRoutes />
                            {/* entity routes */}
                            <EntityRoutes />
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
                    </DataProvider>
                </PersistGate>
            </Provider>
        </React.StrictMode>
    );
};

export default Engine;
