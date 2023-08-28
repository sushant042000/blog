import { createSlice } from "@reduxjs/toolkit";

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
      state.error = null;
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
      state.error = null;
    },
    hasCookies(state){
      state.isLoading = false;
      state.isAuthenticated = true;
      state.error = null;

    }
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
  logoutUserSuccess,
  hasCookies
  
} = userSlice.actions;

export default userSlice.reducer;
