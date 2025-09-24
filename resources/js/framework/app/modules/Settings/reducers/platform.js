import { createSlice } from "@reduxjs/toolkit";

const platformSlice = createSlice({
    name: "platform",
    initialState: {
        navOpen: false,
        message: {message: '', type: 'message'}
    },
    reducers: {
        setNavOpen: (state, action) => {
            state.navOpen = action.payload;
        },
        setNotification: (state, action) => {
            state.message = action.payload;
        }
    }
});

export const { setNavOpen, setNotification } = platformSlice.actions;
export const getNavOpen = (state) => state.platform.navOpen;
export const getNotification = state => state.platform.message;

export default platformSlice.reducer;