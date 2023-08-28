import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import postSlice from "./Slices/postSlice";
import myPostSlice from "./Slices/myPostSlice";
// import allPostSlice from "./Slices/postSlice";

const store=configureStore({
    reducer:{
        user:userSlice,
        allPosts:postSlice ,
        myPosts:myPostSlice       
    }
})

export default store;