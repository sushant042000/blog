import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  posts: null,
  error: null,
};

const myPostsSlice = createSlice({
  name: "myposts",
  initialState,
  reducers: {
    getMypostStart(state) {
      state.isLoading = true;
      state.error = null;
      state.posts = null;
    },

    getMypostSuccess(state,action) {
        state.isLoading = false;
        state.error = null;
        state.posts = action.payload;
      },

      getMypostFail(state,action) {
        state.isLoading = false;
        state.error = action.payload;
        state.posts = null;
      },
  },
});

export const {getMypostStart,getMypostSuccess,getMypostFail} =myPostsSlice.actions;

export default myPostsSlice.reducer;

