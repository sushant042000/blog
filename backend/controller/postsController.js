const Post = require("../models/postModel");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/custumError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");



exports.createPost = asyncErrorHandler(async (req, res, next) => {
  const requiredFields = ["title", "description", "image"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    const errorMessage = `${missingFields.join(",")} is required`;

    next(new ErrorHandler(errorMessage, 400));
  }
  const { title, description, category, image } = req.body;

  const id = req.user._id;

  const myCloud = await cloudinary.v2.uploader.upload(image, {
    folder: "blog_images",
    width: 150,
    crop: "scale",
  });

  const post = await Post.create({
    title,
    content: description,
    author: id,
    category,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  const data = await post.save();

  return res.status(200).json({
    success: "true",
    data,
  });
});




exports.updatePost = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const requiredFields = ["title", "description", "image"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    const errorMessage = `${missingFields.join(",")} is required`;

    next(new ErrorHandler(errorMessage, 400));
  }

  const { image, description, title } = req.body;

  const myCloud = await cloudinary.v2.uploader.upload(image, {
    folder: "blog_images",
    width: 150,
    crop: "scale",
  });

  if (!myCloud) {
    next(new ErrorHandler("Internal server Error", 500));
  }

  const dataToUpdate = {
    title: title,
    content: description,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  };

  const updatedData = await Post.findByIdAndUpdate({ _id: id }, dataToUpdate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({
    success: "true",
    updatedData,
  });
});




exports.allPosts = asyncErrorHandler(async (req, res) => {
  const posts = await Post.find();

  return res.status(200).json({
    success: "true",
    posts,
  });
});




exports.deletePost = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const isExist = await Post.findOne({ _id: id });

  if (!isExist) {
    next(new ErrorHandler("Post not found", 404));
  }

  const data = await Post.findByIdAndDelete({ _id: id });

  return res.status(200).json({
    success: "true",
    message: "post deleted successfully",
  });
});
