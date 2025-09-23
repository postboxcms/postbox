import { all } from "redux-saga/effects";
import authSaga from "@modules/Auth/middleware/saga";

export default function* rootSaga() {
    yield all([
        authSaga()
    ])
}