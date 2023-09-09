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
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const getToken = (state) => state.token;
export const getUser = (state) => state.user;

export const { setToken, setUser } = jwtSlice.actions;

export default jwtSlice.reducer;
