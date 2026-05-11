import { put, call, select, takeLeading, takeEvery } from 'redux-saga/effects';
import { getRequest, updateRequest, postRequest } from '@app/services/api';
import {
  setEntities,
  setEntity,
  loadEntities,
  loadEntity,
  updateEntity,
  storeEntity,
} from '@modules/entity/reducers/entities';
import { setNotification } from '@modules/settings/reducers/platform';
import { generateEntityPath } from '@modules/entity/helpers/entity';
import { entity } from '@app/constants';

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
    const updatedRecord = yield call(getRequest, {
      endpoint: `${generateEntityPath(payload.endpoint, payload.eid)}`,
      token: payload.token,
    });
    
    // Get current entity data and merge with updated record
    const currentEntity = yield select((state) => state.entities.details);
    if (currentEntity?.entity?.data) {
      const updatedData = currentEntity.entity.data.map((record) => 
        record.uuid?.value === payload.eid ? updatedRecord.entity.data[0] : record
      );
      yield put(setEntity({
        ...currentEntity,
        entity: {
          ...currentEntity.entity,
          data: updatedData
        }
      }));
    } else {
      yield put(setEntity(updatedRecord));
    }
    
    yield put(setNotification({ message: entity.successMessage, type: 'message' }));
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
