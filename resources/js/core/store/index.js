import { configureStore, combineReducers } from "@reduxjs/toolkit";
import jwtReducer from "./jwt";

const rootReducer = combineReducers({
    jwtReducer,
});
export const store = configureStore({
    reducer: rootReducer,
});
export default rootReducer;