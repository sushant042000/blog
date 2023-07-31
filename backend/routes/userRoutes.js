const express=require("express");
const router=express.Router()
const { register, loginUser, updateUserProfile, logout, myposts, getAllUsers, getProfile } = require("../controller/userController");

const { createPost, updatePost, allPosts } = require("../controller/postsController");
const { isAuthenticated, isAdmin } = require("../middleware/Auth");




router.post('/register',register);
router.post('/login',loginUser);
router.put('/updateProfile',isAuthenticated,updateUserProfile);
router.get('/logout',isAuthenticated,logout);
router.get('/myProfile',isAuthenticated,getProfile);

//admin
router.get('/admin/getAllUser',isAuthenticated,isAdmin,getAllUsers);


//post
 router.post('/post/create',isAuthenticated,createPost);
 router.put('/post/update/:id',isAuthenticated,updatePost);
 router.get("/post/mypost",isAuthenticated,myposts);
 router.get("/post/all",allPosts);






module.exports=router;