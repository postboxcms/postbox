import { put, call, select, takeLeading, takeEvery } from "redux-saga/effects";
import { setWebsiteLogo, setWebsiteName, setWebsiteStatus, setWebsiteTitle, updateSettings, loadWebsite, setWebsiteLoaded } from "@modules/Settings/reducers/site";
import { setNotification } from "@modules/Settings/reducers/platform";
import { getRequest, postRequest } from "@app/services/api";

function* postSettings(action) {
    try {
        const status = yield select((state) => state.site.status);
        if (status !== "pending") return;
        const response = yield call(postRequest, action.payload);
        const data = yield call(getRequest, { endpoint: `website`, token: action.payload.token });
        for (const item of data?.data) {
            switch (item.property) {
                case "name":
                    yield put(setWebsiteName(item.value));
                    break;
                case "title":
                    yield put(setWebsiteTitle(item.value));
                    break;
                case "isProductionReady":
                    yield put(setWebsiteStatus(Boolean(Number(item.value))));
                    break;
                case "siteLogo":
                    const logo = response?.data?.file;
                    if (logo) {
                        yield put(setWebsiteLogo(logo));
                    }
                    break;
                default:
                    break;
            }
        }
        yield put(setNotification({ message: response?.message || "Settings updated successfully", type: 'message' }));
    } catch (e) {
        yield put(setNotification({ message: e.message, type: 'error' }));
    }
}

function* getSettings(action) {
    try {
        const status = yield select((state) => state.site.status);
        const data = yield call(getRequest, { endpoint: `website`, token: action.payload.token });
        if (status !== "pending") return;
        for (const item of data?.data) {
            switch (item.property) {
                case "name":
                    yield put(setWebsiteName(item.value));
                    yield put(setWebsiteLoaded());
                    break;
                case "title":
                    yield put(setWebsiteTitle(item.value));
                    yield put(setWebsiteLoaded());
                    break;
                case "isProductionReady":
                    yield put(setWebsiteStatus(Boolean(Number(item.value))));
                    yield put(setWebsiteLoaded());
                    break;
                case "siteLogo":
                    yield put(setWebsiteLogo(item.value));
                    yield put(setWebsiteLoaded());
                    break;
                default:
                    yield put(setWebsiteLoaded());
                    break;
            }
        }
    } catch (e) {
        yield put(setNotification({ message: e.message, type: 'error' }));
    }
}

function* settingsSaga() {
    yield takeEvery(updateSettings, postSettings);
    yield takeLeading(loadWebsite, getSettings);
}

export default settingsSaga;