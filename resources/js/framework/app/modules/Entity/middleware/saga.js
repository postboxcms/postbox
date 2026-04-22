import { put, call, select, takeLeading, takeEvery } from 'redux-saga/effects';
import { getRequest, updateRequest, postRequest } from '@app/services/api';
import {
  setEntities,
  setEntity,
  loadEntities,
  loadEntity,
  updateEntity,
  storeEntity,
} from '@modules/Entity/reducers/entities';
import { setNotification } from '@modules/Settings/reducers/platform';
import { generateEntityPath } from '@modules/Entity/helpers/entity';

function* getEntities(action) {
  try {
    const status = yield select((state) => state.entities.status);
    if (status !== 'pending') return;
    const data = yield call(getRequest, { endpoint: 'entity', token: action.payload });
    yield put(setEntities(data));
  } catch (e) {
    yield put(setNotification({ message: e.message, type: 'error' }));
  }
}

function* getEntity(action) {
  try {
    const status = yield select((state) => state.entities.status);
    if (status !== 'pending') return;
    const modifiedPath = generateEntityPath(action.payload.path, action.payload.eid);
    // yield put(setEntity([])); // Reset previous entity details
    const data = yield call(getRequest, {
      endpoint: `entity/${modifiedPath}`,
      token: action.payload.token,
    });
    yield put(setEntity(data));
  } catch (e) {
    yield put(setNotification({ message: e.message, type: 'error' }));
  }
}

function* putEntity(action) {
  try {
    const status = yield select((state) => state.entities.status);
    if (status !== 'pending') return;
    yield call(postRequest, action.payload);
    const payload = Object.fromEntries(action.payload);
    const refreshState = payload?.refresh === 'false' ? false : true;
    const path = payload.endpoint.replace('/entity/', '');
    if (refreshState) {
      const data = yield call(getRequest, {
        endpoint: `entity/${generateEntityPath(path, payload.eid)}`,
        token: payload.token,
      });
      yield put(setEntity(data));
    }
    yield put(setNotification({ message: 'Entity updated successfully', type: 'message' }));
  } catch (e) {
    console.error(e);
    yield put(setNotification({ message: e.message, type: 'error' }));
  }
}

function* postEntity(action) {
  try {
    const status = yield select((state) => state.entities.status);
    if (status !== 'pending') return;
    const response = yield call(postRequest, action.payload);
    yield put(setEntity(response));
    yield put(setNotification({ message: response?.message, type: 'message' }));
  } catch (e) {
    yield put(setNotification({ message: e.message, type: 'error' }));
  }
}

function* entitySaga() {
  yield takeLeading(loadEntities, getEntities);
  yield takeLeading(loadEntity, getEntity);
  yield takeEvery(updateEntity, putEntity);
  yield takeEvery(storeEntity, postEntity);
}

export default entitySaga;
