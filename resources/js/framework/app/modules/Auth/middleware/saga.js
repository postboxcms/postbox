import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { authenticateUser, unAuthenticateUser } from "@app/services/api";
import { loginUser, logoutUser, setUser, unsetToken, unsetUser, setUserError, setToken } from "@modules/Auth/reducers/user";

function* processLogin(action) {
    try {
        const data = yield call(authenticateUser, action.payload);
        yield put(setUser(data.user));
        yield put(setToken(data.token));
    } catch (e) {
        yield put(setUserError(e.message));
    }
}

function* processLogout(action) {
    try {
        const data = yield call(unAuthenticateUser, action.payload);
        yield put(unsetToken(data.token));
        yield put(unsetUser(data.user));
    } catch (e) {
        yield put(setUserError(e.message));
    }
}

function* authSaga() {
    yield takeLatest(loginUser, processLogin);
    yield takeEvery(logoutUser, processLogout);
}

export default authSaga;