import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./slices/userSlices";
import postSlice from "./slices/postSlice";
import allPostSlice from "./slices/allPostSlice";

const store=configureStore({
    reducer:{
        user:userSlice,
        post:postSlice,
        allPost:allPostSlice
    }
})

export default store;