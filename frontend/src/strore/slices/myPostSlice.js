import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
  isLoading: false,
  error: null,
};

const myPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getMyPostStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getMyPostSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = null;
    },
    getMyPostFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {getMyPostStart,getMyPostSuccess,getMyPostFail}=myPostSlice.actions;

export default myPostSlice.reducer;

