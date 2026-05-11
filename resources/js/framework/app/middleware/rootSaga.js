import { all } from "redux-saga/effects";
import authSaga from "@modules/auth/middleware/saga";
import entitySaga from "@modules/entity/middleware/saga";
import crudSaga from "@modules/crud/middleware/saga";
import settingsSaga from "@modules/settings/middleware/saga";

export default function* rootSaga() {
    yield all([
        authSaga(),
        entitySaga(),
        crudSaga(),
        settingsSaga(),
    ])
}