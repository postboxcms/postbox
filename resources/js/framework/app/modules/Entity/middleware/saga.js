import { put, call, takeLeading } from "redux-saga/effects";
import { fetchEntities } from "@app/services/api";
import { setEntities, loadEntities } from "@modules/Entity/reducers/entities";
import { setNotification } from "@modules/Settings/reducers/platform";

function* processEntities(action) {
    try {
        const data = yield call(fetchEntities, action.payload);
        yield put(setEntities(data));
    } catch (e) {
        yield put(setNotification({ message: e.message, type: 'error' }));
    }
}

function* entitySaga() {
    yield takeLeading(loadEntities, processEntities);
}

export default entitySaga;