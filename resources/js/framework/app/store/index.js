import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import jwtReducer from "../modules/Auth/reducers/jwt";
import contentTypesReducer from "../modules/ContentType/reducers/contentTypes";

const rootReducer = combineReducers({
    jwt: jwtReducer,
    contentTypes: contentTypesReducer
});
const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});
export const persistor = persistStore(store);
