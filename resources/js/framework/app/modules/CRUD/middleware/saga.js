import { takeLatest, put, call } from "redux-saga/effects";
import { fetchCRUD } from "@app/services/api";
import { setCRUD, loadCRUD } from "@modules/CRUD/reducers/crud";
import { setNotification } from "@modules/Settings/reducers/platform";

function* processCRUD(action) {
    try {
        const response = yield call(fetchCRUD, action.payload);
        yield put(setCRUD(response));
    } catch (e) {
        yield put(setNotification(e.message));
    }
}

function* crudSaga() {
    yield takeLatest(loadCRUD, processCRUD);
}

export default crudSaga;