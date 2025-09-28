import { put, call, takeLeading } from "redux-saga/effects";
import { fetchEntities, fetchEntity } from "@app/services/api";
import { setEntities, setEntity, loadEntities, loadEntity } from "@modules/Entity/reducers/entities";
import { setNotification } from "@modules/Settings/reducers/platform";

function* processEntities(action) {
    try {
        const data = yield call(fetchEntities, action.payload);
        yield put(setEntities(data));
    } catch (e) {
        yield put(setNotification({ message: e.message, type: 'error' }));
    }
}

function* processEntity(action) {
    try {
        const data = yield call(fetchEntity, action.payload);
        yield put(setEntity(data));
    } catch (e) {
        yield put(setNotification({ message: e.message, type: 'error' }));
    }
}

function* entitySaga() {
    yield takeLeading(loadEntities, processEntities);
    yield takeLeading(loadEntity, processEntity);
}

export default entitySaga;