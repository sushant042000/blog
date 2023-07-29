import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const allPostSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {
    getAllPostsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getAllPostsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    getAllPostsFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getAllPostsStart, getAllPostsSuccess, getAllPostsFail } =
  allPostSlice.actions;
export default allPostSlice.reducer;
