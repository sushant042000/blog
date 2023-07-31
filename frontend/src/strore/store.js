import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlices";
import postSlice from "./slices/postSlice";
import allPostSlice from "./slices/allPostSlice";

import myPostSlice from "./slices/myPostSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    allPost: allPostSlice,
    myPost: myPostSlice,
  },
});

export default store;
