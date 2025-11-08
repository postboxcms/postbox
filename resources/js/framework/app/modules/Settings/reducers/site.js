import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice({
    name: "site",
    initialState: {
        name: "Postbox",
        title: "",
        status: "idle",
        isProductionReady: 0,
        logo: null
    },
    reducers: {
        setWebsiteName: (state, action) => {
            state.name = action.payload;
            state.status = "fulfilled";
        },
        setWebsiteTitle: (state, action) => {
            state.title = action.payload;
            state.status = "fulfilled";
        },
        setWebsiteStatus: (state, action) => {
            state.isProductionReady = action.payload;
            state.status = "fulfilled";
        },
        setWebsiteLogo: (state, action) => {
            state.logo = action.payload;
            state.status = "fulfilled";
        },
        updateSettings: (state) => {
            state.status = "pending";
        }
    },
});

export const getWebsiteName = (state) => state.site.name;
export const getWebsiteTitle = (state) => state.site.title;
export const getWebsiteStatus = (state) => state.site.isProductionReady;
export const getWebsiteLogo = (state) => state.site.logo;


export const { setWebsiteName, setWebsiteTitle, setWebsiteStatus, setWebsiteLogo, updateSettings } =
    siteSlice.actions;

export default siteSlice.reducer;