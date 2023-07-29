import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postData: null,
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPostStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.postData = action.payload;
      state.error = null;
    },
    createPostFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { createPostStart, createPostSuccess, createPostFail } =
  postSlice.actions;
export default postSlice.reducer;
