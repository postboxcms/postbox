import { createSlice } from "@reduxjs/toolkit";

const jwtSlice = createSlice({
    name: "jwt",
    initialState: {
        token: null,
        user: null,
    },
    reducers: {
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

export const getToken = (state) => state.jwt.token;
export const getUser = (state) => state.jwt.user;

export const { setToken, setUser, unsetToken, unsetUser } = jwtSlice.actions;

export default jwtSlice.reducer;
