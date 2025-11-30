import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import rootSaga from "@app/middleware/rootSaga";
import userReducer from "@modules/Auth/reducers/user";
import entitiesReducer from "@modules/Entity/reducers/entities";
import siteReducer from "@modules/Settings/reducers/site";
import platformReducer from "@modules/Settings/reducers/platform";
import crudReducer from "@modules/CRUD/reducers/crud";

const rootReducer = combineReducers({
    auth: userReducer,
    entities: entitiesReducer,
    site: siteReducer,
    platform: platformReducer,
    crud: crudReducer
});
const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const MAX_SAGA_RUNS = 5;
let _sagaRunCount = 0;
const _origRun = sagaMiddleware.run.bind(sagaMiddleware);

sagaMiddleware.run = (saga, ...args) => {
    if (_sagaRunCount >= MAX_SAGA_RUNS) {
        console.warn(`Saga run blocked: exceeded max of ${MAX_SAGA_RUNS}`);
        // return a minimal Task-like object so callers expecting a Task won't break
        return {
            done: Promise.resolve(),
            isRunning: false,
            toPromise() { return Promise.resolve(); },
        };
    }
    _sagaRunCount += 1;
    return _origRun(saga, ...args);
};

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
