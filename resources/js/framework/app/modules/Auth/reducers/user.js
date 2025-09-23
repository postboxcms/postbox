import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "auth",
    initialState: {
        status: "idle",
        error: null,
        token: null,
        user: null,
    },
    reducers: {
        loginUser: (state) => {
            state.status = "pending";
        },
        logoutUser: (state) => {
            state.status = "pending";
        },
        setUserError: (state, action) => {
            state.error = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        unsetToken: (state) => {
            state.token = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        unsetUser: (state) => {
            state.user = null;
        },
    },
});

export const getToken = (state) => state.auth.token;
export const getUser = (state) => state.auth.user;

export const { setToken, setUser, unsetToken, unsetUser, loginUser, logoutUser, setUserError } = userSlice.actions;

export default userSlice.reducer;
