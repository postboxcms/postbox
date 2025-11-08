import { put, call, takeLeading, select } from "redux-saga/effects";
import { getRequest, postRequest } from "@app/services/api";
import { setCRUD, loadCRUD, storeCRUD } from "@modules/CRUD/reducers/crud";
import { setNotification } from "@modules/Settings/reducers/platform";

function* getCRUD(action) {
    try {
        const status = yield select((state) => state.crud.status);
        if (status !== "pending") return;
        const { path, token } = action.payload;
        const modifiedPath = path !== "" ? `crud/${path}` : "crud";
        const response = yield call(getRequest, { endpoint: modifiedPath, token });
        yield put(setCRUD(response));
    } catch (e) {
        yield put(setNotification({message: e.message, type: 'error'}));
    }
}

function* postCRUD(action) {
    try {
        const status = yield select((state) => state.crud.status);
        if (status !== "pending") return;
        const response = yield call(postRequest, { ...action.payload, endpoint: 'crud' });
        yield put(setNotification({message: response?.message || "CRUD operation successful", type: "message"}));
        action.payload.onClose();
    } catch (e) {
        yield put(setNotification({message: e.message, type: 'error'}));
    }
}

function* crudSaga() {
    yield takeLeading(loadCRUD, getCRUD);
    yield takeLeading(storeCRUD, postCRUD);
}

export default crudSaga;