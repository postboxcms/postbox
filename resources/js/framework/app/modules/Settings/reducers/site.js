import { createSlice } from '@reduxjs/toolkit';

const siteSlice = createSlice({
  name: 'site',
  initialState: {
    name: 'Postbox',
    title: '',
    status: 'idle',
    isProductionReady: false,
    logo: null,
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
    },
    setWebsiteTheme: (state, action) => {
      state.theme = action.payload;
    },
    updateSettings: (state) => {
      state.status = 'pending';
    },
    loadWebsite: (state) => {
      state.status = 'pending';
    },
    setWebsiteLoaded: (state) => {
      state.status = 'fulfilled';
    },
  },
});

export const getWebsiteName = (state) => state.site.name;
export const getWebsiteTitle = (state) => state.site.title;
export const getWebsiteStatus = (state) => state.site.isProductionReady;
export const getWebsiteLogo = (state) => state.site.logo;
export const getSystemStatus = (state) => state.site.status;
export const getWebsiteTheme = (state) => state.site.theme;

export const {
  setWebsiteName,
  setWebsiteTitle,
  setWebsiteStatus,
  setWebsiteLogo,
  setWebsiteLoaded,
  setWebsiteTheme,
  updateSettings,
  loadWebsite,
} = siteSlice.actions;

export default siteSlice.reducer;
