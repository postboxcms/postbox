import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";

// variables
import { history } from "@app/utils";
// store
import { store, persistor } from "@app/store";
// core modules
import DataProvider from "@providers/DataProvider";

import AuthRoutes from "@app/routes/AuthRoute";
import AdminRoutes from "@app/routes/AdminRoutes";
import EntityRoutes from "@app/routes/EntityRoutes";

/** React router to setup UI routes */
const Engine = () => {
    return (
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
                    </Router>
                </DataProvider>
            </PersistGate>
        </Provider>
    );
};

export default Engine;
