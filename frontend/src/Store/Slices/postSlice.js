import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: null,
  isLoading: false,
  error: null,
};

const allPostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getAllPostStart(state) {
      state.isLoading = true;
      state.error = null;
    },

    getAllPostSuccess(state, action) {
      state.allPosts = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    getAllPostFailure(state, action) {
      state.allPosts = null;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getAllPostStart, getAllPostSuccess, getAllPostFailure } =
  allPostSlice.actions;
export default allPostSlice.reducer;
