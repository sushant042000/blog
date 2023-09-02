const Post = require("../models/postModel");
const User = require("../models/userModel");
const cloudinary = require("cloudinary");
``

const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/custumError");



exports.register = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password ,profileImage} = req.body;
   if(!profileImage){
    next(new CustomError("profile image is required",400));
   }
  const myProfile = await cloudinary.v2.uploader.upload(profileImage, {
    folder: "profileImages",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    profileImage:{
      public_id: myProfile.public_id,
      url: myProfile.secure_url,
    }

  });

  const data = await user.save();

  const dataWithoutPassword = data.toObject();

  delete dataWithoutPassword["password"];

  return res.status(201).json({
    success: "true",
    data: dataWithoutPassword,
  });
});



exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new CustomError("please provide email and password"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    next(new CustomError("user not found", 404));
  }

  const isPasswordMatch = await user.passwordMatch(password);

  if (!isPasswordMatch) {
    next(new CustomError("Entered wrong credentials", 401));
  }
  const token = await user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  };
  return res.status(200).cookie("token", token, options).json({
    message: "success",
    data:user
  });
});



exports.updateUserProfile = asyncErrorHandler(async (req, res) => {
  const id = req.user._id;
  const { name, email, profileImage } = req.body;

  const myProfile = await cloudinary.v2.uploader.upload(profileImage, {
    folder: "profileImages",
    width: 150,
    crop: "scale",
  });

  const data = {
    name,
    email,
    profileImage: {
      public_id: myProfile.public_id,
      url: myProfile.secure_url,
    },
  };

  const updatedData = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({
    success: "true",
    message: "Profile updated",
    data: updatedData,
  });
});



exports.getProfile = asyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword["password"];
  return res.status(200).json({
    success: true,
    data: userWithoutPassword,
  });
});



exports.myposts = asyncErrorHandler(async (req, res) => {
  const posts = await Post.find({ author: req.user._id });
  return res.status(200).json({
    success: "true",
    posts,
  });
});



exports.logout = asyncErrorHandler(async (req, res) => {
  const options = {
    expires: new Date(Date.now()),
  };
  return res.status(200).cookie("token", null, options).json({
    message: "success",
  });
});



//admin
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const data = await User.find();

  return res.status(200).json({
    success: "true",
    count: data.length,
    data,
  });
});
