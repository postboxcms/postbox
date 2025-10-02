import { put, call, takeLeading, select } from "redux-saga/effects";
import { fetchCRUD } from "@app/services/api";
import { setCRUD, loadCRUD } from "@modules/CRUD/reducers/crud";
import { setNotification } from "@modules/Settings/reducers/platform";

function* processCRUD(action) {
    try {
        const status = yield select((state) => state.crud.status);
        if (status !== "pending") return;
        const response = yield call(fetchCRUD, action.payload);
        yield put(setCRUD(response));
    } catch (e) {
        yield put(setNotification(e.message));
    }
}

function* crudSaga() {
    yield takeLeading(loadCRUD, processCRUD);
}

export default crudSaga;