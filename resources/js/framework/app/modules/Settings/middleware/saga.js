import { put, call, select, takeLeading, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  setWebsiteLogo,
  setWebsiteName,
  setWebsiteStatus,
  setWebsiteTitle,
  setWebsiteTheme,
  updateSettings,
  loadWebsite,
  setWebsiteLoaded,
} from '@modules/Settings/reducers/site';
import {
  setNotification,
  setThemeCollection,
  setPlatformLoaded,
  loadThemes,
} from '@modules/Settings/reducers/platform';
import { getRequest, postRequest } from '@app/services/api';

function* postSettings(action) {
  try {
    const status = yield select((state) => state.site.status);
    if (status !== 'pending') return;
    const response = yield call(postRequest, action.payload);
    const data = yield call(getRequest, { endpoint: `website`, token: action.payload.token });
    for (const item of data?.data) {
      switch (item.property) {
        case 'name':
          yield put(setWebsiteName(item.value));
          break;
        case 'title':
          yield put(setWebsiteTitle(item.value));
          break;
        case 'isProductionReady':
          yield put(setWebsiteStatus(Boolean(Number(item.value))));
          break;
        case 'siteLogo':
          const logo = response?.data?.file;
          if (logo) {
            yield put(setWebsiteLogo(logo));
          }
          break;
        case 'theme':
          const theme = response?.data?.theme;
          if (theme) {
            yield put(setWebsiteTheme(theme));
          }
        default:
          break;
      }
    }
    yield put(
      setNotification({
        message: response?.message || 'Settings updated successfully',
        type: 'message',
      })
    );
  } catch (e) {
    yield put(setNotification({ message: e.message, type: 'error' }));
  }
}

function* getSettings(action) {
  try {
    const status = yield select((state) => state.site.status);
    if (status !== 'pending') return;
    const data = yield call(getRequest, { endpoint: `website`, token: action.payload.token });
    for (const item of data?.data) {
      switch (item.property) {
        case 'name':
          yield put(setWebsiteName(item.value));
          yield put(setWebsiteLoaded());
          break;
        case 'title':
          yield put(setWebsiteTitle(item.value));
          yield put(setWebsiteLoaded());
          break;
        case 'isProductionReady':
          yield put(setWebsiteStatus(Boolean(Number(item.value))));
          yield put(setWebsiteLoaded());
          break;
        case 'siteLogo':
          yield put(setWebsiteLogo(item.value));
          yield put(setWebsiteLoaded());
          break;
        case 'theme':
          yield put(setWebsiteTheme(item.value));
          yield put(setWebsiteLoaded());
        default:
          yield put(setWebsiteLoaded());
          break;
      }
    }
  } catch (e) {
    yield put(setNotification({ message: e.message, type: 'error' }));
  }
}

function* getThemeConfiguration(action) {
  try {
    const status = yield select((state) => state.platform.status);
    if (status !== 'pending') return;
    const loadedThemes = __PBX_THEMES_DATA__;
    if (loadedThemes && loadedThemes.length > 0) {
      const themeCollection = loadedThemes.map((theme) => {
        return {
          label: theme.name,
          value: theme.dbval,
        };
      });
      yield put(setThemeCollection(themeCollection));
      yield put(setPlatformLoaded());
    }
  } catch (e) {
    yield put(setNotification({ message: e.message, type: 'error' }));
  }
}

function* settingsSaga() {
  yield takeEvery(updateSettings, postSettings);
  yield takeLeading(loadWebsite, getSettings);
  yield takeLeading(loadThemes, getThemeConfiguration);
}

export default settingsSaga;
