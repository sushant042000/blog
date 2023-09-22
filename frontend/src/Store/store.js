import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import postSlice from "./Slices/postSlice";
import myPostSlice from "./Slices/myPostSlice";
import filterSlice from "./Slices/filterSlice";
// import allPostSlice from "./Slices/postSlice";

const store=configureStore({
    reducer:{
        user:userSlice,
        allPosts:postSlice ,
        myPosts:myPostSlice   ,
        filter:filterSlice    
    }
})

export default store;