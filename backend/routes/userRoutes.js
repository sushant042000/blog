const express=require("express");
const { register, loginUser, updateUserProfile, logout } = require("../controller/userController");
const isAuthenticated = require("../middleware/Auth");
const router=express.Router();


router.post('/register',register);
router.post('/login',loginUser);
router.put('/updateProfile',isAuthenticated,updateUserProfile);
router.get('/logout',isAuthenticated,logout);






module.exports=router;