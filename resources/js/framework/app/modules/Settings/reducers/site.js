import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice({
    name: "site",
    initialState: {
        name: "Postbox",
        title: "",
        isProductionReady: 0,
        logo: null
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
        setWebsiteLogo: (state, action) => {
            state.logo = action.payload;
        }
    },
});

export const getWebsiteName = (state) => state.site.name;
export const getWebsiteTitle = (state) => state.site.title;
export const getWebsiteStatus = (state) => state.site.isProductionReady;
export const getWebsiteLogo = (state) => state.site.logo;


export const { setWebsiteName, setWebsiteTitle, setWebsiteStatus, setWebsiteLogo } =
    siteSlice.actions;

export default siteSlice.reducer;