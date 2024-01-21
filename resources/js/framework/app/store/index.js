import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import jwtReducer from "./jwt";

const rootReducer = combineReducers({
    jwt: jwtReducer,
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
