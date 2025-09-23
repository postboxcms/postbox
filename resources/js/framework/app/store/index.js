import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import rootSaga from "@app/middleware/rootSaga";
import userReducer from "@modules/Auth/reducers/user";
import entitiesReducer from "@modules/Entity/reducers/entities";
import siteReducer from "@modules/Settings/reducers/site";
import platformReducer from "@modules/Settings/reducers/platform";

const rootReducer = combineReducers({
    auth: userReducer,
    entities: entitiesReducer,
    site: siteReducer,
    platform: platformReducer
});
const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
