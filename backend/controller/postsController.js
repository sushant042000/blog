const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.user._id;

    const post = await Post.create({ title, content, author: id });
    const data = await post.save();
    return res.status(200).json({
      success: "true",
      data,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({
        validationErrors,
      });
    }
    return res.status(500).json({
      error,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const newUserData = {
      title: req.body.title,
      content: req.body.content,
    };

    const updatedData = await Post.findByIdAndUpdate({ _id: id }, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: "true",
      updatedData,
    });
  } catch (error) {
    return res.status(200).json({
      error,
    });
  }
};
