import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
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
    },
    loginUserSuccess(state, action) {
      state.isLoading = false;
      state.userData = action.payload;
    },
    loginUserFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
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
} = userSlice.actions;

export default userSlice.reducer;
