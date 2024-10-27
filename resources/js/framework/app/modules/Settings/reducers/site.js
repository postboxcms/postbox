import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice({
    name: "site",
    initialState: {
        name: "postbox",
        title: "",
        isProductionReady: 0,
    },
    reducers: {
        setWebsiteName: (state, action) => {
            state.name = action.payload;
        },
        setWebsiteTitle: (state, action) => {
            state.title = action.payload;
        },
        setWebsiteStatus: (state, action) => {
            state.isProductionReady = action.payload;
        },
    },
});

export const getWebsiteName = (state) => state.site.name;
export const getWebsiteTitle = (state) => state.site.title;
export const getWebsiteStatus = (state) => state.site.isProductionReady;

export const { setWebsiteName, setWebsiteTitle, setWebsiteStatus } =
    siteSlice.actions;

export default siteSlice.reducer;