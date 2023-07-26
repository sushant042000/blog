const express=require("express");
const router=express.Router()
const { register, loginUser, updateUserProfile, logout, myposts, getAllUsers } = require("../controller/userController");

const { createPost, updatePost } = require("../controller/postsController");
const { isAuthenticated, isAdmin } = require("../middleware/Auth");




router.post('/register',register);
router.post('/login',loginUser);
router.put('/updateProfile',isAuthenticated,updateUserProfile);
router.get('/logout',isAuthenticated,logout);

//admin
router.get('/admin/getAllUser',isAuthenticated,isAdmin,getAllUsers);


//post
 router.post('/post/create',isAuthenticated,createPost);
 router.put('/post/update/:id',isAuthenticated,updatePost);
 router.get("/post/mypost",isAuthenticated,myposts);






module.exports=router;