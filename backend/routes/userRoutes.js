const express = require("express");
const router = express.Router();
const {
  register,
  loginUser,
  updateUserProfile,
  logout,
  getAllUsers,
  getProfile,
} = require("../controller/userController");

const { isAuthenticated, isAdmin } = require("../middleware/Auth");

router.post("/register", register);
router.post("/login", loginUser);
router.put("/updateProfile", isAuthenticated, updateUserProfile);
router.get("/logout", isAuthenticated, logout);
router.get("/myProfile", isAuthenticated, getProfile);

//admin
router.get("/admin/getAllUser", isAuthenticated, isAdmin, getAllUsers);

module.exports = router;
