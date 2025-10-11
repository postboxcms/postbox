import { put, call, select, takeLeading, takeEvery } from "redux-saga/effects";
import { fetchEntities, fetchEntity, modifyEntity } from "@app/services/api";
import { setEntities, setEntity, loadEntities, loadEntity, updateEntity } from "@modules/Entity/reducers/entities";
import { setNotification } from "@modules/Settings/reducers/platform";

function* getEntities(action) {
    try {
        const status = yield select((state) => state.entities.status);
        if (status !== "pending") return;
        const data = yield call(fetchEntities, action.payload);
        yield put(setEntities(data));
    } catch (e) {
        yield put(setNotification({ message: e.message, type: 'error' }));
    }
}

function* getEntity(action) {
    try {
        const status = yield select((state) => state.entities.status);
        if (status !== "pending") return;
        // yield put(setEntity([])); // Reset previous entity details
        const data = yield call(fetchEntity, action.payload);
        yield put(setEntity(data));
    } catch (e) {
        yield put(setNotification({ message: e.message, type: 'error' }));
    }
}

function* putEntity(action) {
    try {
        const status = yield select((state) => state.entities.status);
        if (status !== "pending") return;
        yield call(modifyEntity, action.payload);
        const data = yield call(fetchEntity, action.payload);
        yield put(setEntity(data));
        yield put(setNotification({ message: "Entity updated successfully", type: 'message' }));
    } catch (e) {
        yield put(setNotification({ message: e.message, type: 'error' }));
    }
}

function* entitySaga() {
    yield takeLeading(loadEntities, getEntities);
    yield takeLeading(loadEntity, getEntity);
    yield takeEvery(updateEntity, putEntity);
}

export default entitySaga;