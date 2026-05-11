import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    error: null,
    token: null,
    user: null,
  },
  reducers: {
    loginUser: (state) => {
      state.status = 'pending';
    },
    logoutUser: (state) => {
      state.status = 'pending';
    },
    setUserError: (state, action) => {
      state.error = action.payload;
      state.status = 'rejected';
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.status = 'fulfilled';
    },
    unsetToken: (state) => {
      state.token = null;
      state.status = 'fulfilled';
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = 'fulfilled';
    },
    unsetUser: (state) => {
      state.user = null;
      state.status = 'fulfilled';
    },
    clearUserState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.token = null;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const getToken = (state) => state.auth.token;
export const getUser = (state) => state.auth.user;
export const getUserError = (state) => state.auth.error;

export const {
  clearUserState,
  setToken,
  setUser,
  unsetToken,
  unsetUser,
  loginUser,
  logoutUser,
  setUserError,
} = userSlice.actions;

export default userSlice.reducer;
