import { createSlice } from "@reduxjs/toolkit";

const platformSlice = createSlice({
    name: "platform",
    initialState: {
        navOpen: false,
    },
    reducers: {
        setNavOpen: (state, action) => {
            state.navOpen = action.payload;
        }
    }
});

export const { setNavOpen } = platformSlice.actions;
export const getNavOpen = (state) => state.platform.navOpen;

export default platformSlice.reducer;