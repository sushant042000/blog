const express=require("express");
const { register, loginUser, updateUserProfile } = require("../controller/userController");
const router=express.Router();


router.post('/register',register);
router.post('/login',loginUser);
router.put('/updateProfile',updateUserProfile);






module.exports=router;