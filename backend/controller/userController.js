const Post = require("../models/postModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });

    const save = await user.save();

    res.status(200).json({
      success: "true",
      data: save,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      res.status(400).json({
        validationErrors,
      });
    }
    if (error.code === 11000) {
      res.status(400).json({
        message: `Duplicate ${Object.keys(error.keyValue)} entered`,
      });
    }

    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const isPasswordMatch = await user.passwordMatch(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "enterd wrong password",
      });
    }
    const token = await user.getJwtToken();
    const options = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    return res.status(200).cookie("token", token, options).json({
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    console.log("cookie", req.cookies);
    const { name, email, id } = req.body;

    const data = {
      name,
      email,
    };

    const updatedData = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(200).json({
      success: "true",
      data: updatedData,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

exports.myposts = async (req, res) => {
  const posts = await Post.find({ author: req.user._id });
  return res.status(200).json({
    success: "true",
    posts,
  });
};

exports.logout = async (req, res) => {
  const options = {
    expires: new Date(Date.now()),
  };
  return res.status(200).cookie("token", null, options).json({
    message: "success",
  });
};


//admin

exports.getAllUsers=async (req,res)=>{
  try {
    const data=await User.find();
    const totalUsers=data.length;
    return res.status(200).json({
      success: "true",
      totalUsers,
      data,
    });


  } catch (error) {
    return res.status(500).json({
      error,
    });
    
  }
}
