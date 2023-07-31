import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    registerUserSuccess(state, action) {
      state.isLoading = false;
      state.userData = action.payload;
    },
    registerUserFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginUserStart(state) {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
    },
    loginUserSuccess(state, action) {
      state.isLoading = false;
      state.userData = action.payload;
      state.isAuthenticated = true;
    },
    loginUserFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logoutUserStart(state) {
      state.isLoading = true;
    },
    logoutUserSuccess(state) {
      state.isLoading = false;
      state.isAuthenticated = false;
    },
  },
});

export const {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  loginUserFailure,
  loginUserStart,
  loginUserSuccess,
  logoutUserStart,
  logoutUserSuccess
} = userSlice.actions;

export default userSlice.reducer;
