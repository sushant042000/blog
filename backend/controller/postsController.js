const Post = require("../models/postModel");
const cloudinary = require("cloudinary");

const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/custumError");



exports.createPost = asyncErrorHandler(async (req, res, next) => {
  const { title, description, category, image } = req.body;

  const id = req.user._id;

  if (!image) {
    return next(new CustomError("image is required", 400));
  }

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

  const { image, description, title } = req.body;

  if (!image) {
    return next(new CustomError("image is required", 400));
  }

  const myCloud = await cloudinary.v2.uploader.upload(image, {
    folder: "blog_images",
    width: 150,
    crop: "scale",
  });

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



exports.allPosts = asyncErrorHandler(async (req, res, next) => {
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
    const err = new CustomError("Post not found with this id", 404);
    next(err);
  }

  const data = await Post.findByIdAndDelete({ _id: id });

  return res.status(200).json({
    success: "true",
    message: "post deleted successfully",
  });
});
