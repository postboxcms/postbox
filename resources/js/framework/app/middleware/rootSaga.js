import { all } from "redux-saga/effects";
import authSaga from "@modules/Auth/middleware/saga";
import entitySaga from "@modules/Entity/middleware/saga";
import crudSaga from "@modules/CRUD/middleware/saga";
import settingsSaga from "@modules/Settings/middleware/saga";

export default function* rootSaga() {
    yield all([
        authSaga(),
        entitySaga(),
        crudSaga(),
        settingsSaga(),
    ])
}