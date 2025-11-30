import { createSlice } from '@reduxjs/toolkit';

const platformSlice = createSlice({
  name: 'platform',
  initialState: {
    status: 'idle',
    navOpen: false,
    message: { message: '', type: 'message' },
    themeCollection: {},
  },
  reducers: {
    loadThemes: (state) => {
      state.status = 'pending';
    },
    setNavOpen: (state, action) => {
      state.navOpen = action.payload;
    },
    setNotification: (state, action) => {
      state.message = action.payload;
    },
    setThemeCollection: (state, action) => {
      state.themeCollection = action.payload;
    },
    setPlatformLoaded: (state) => {
      state.status = 'fulfilled';
    },
  },
});

export const { setNavOpen, setNotification, setThemeCollection, setPlatformLoaded, loadThemes } =
  platformSlice.actions;
export const getNavOpen = (state) => state.platform.navOpen;
export const getNotification = (state) => state.platform.message;
export const getThemeCollection = (state) => state.platform.themeCollection;

export default platformSlice.reducer;
