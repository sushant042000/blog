const express=require("express");
const { isAuthenticated } = require("../middleware/Auth");
const { createPost, updatePost, deletePost, allPosts } = require("../controller/postsController");
const { myposts } = require("../controller/userController");
const router=express.Router();


//posts
router.post('/create',isAuthenticated,createPost);
router.put('/update/:id',isAuthenticated,updatePost);
router.put('/delete/:id',isAuthenticated,deletePost);
router.get("/mypost",isAuthenticated,myposts);
router.get("/all",allPosts);

module.exports=router;
