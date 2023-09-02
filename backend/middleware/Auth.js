const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const CustomError = require("../utils/custumError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    const err = new CustomError("please login to access this resource", 401);
    return next(err);
  }

  const decoded = await jwt.decode(token, process.env.JWT_SECRETE);
  const user = await User.findById({ _id: decoded.id });

  if (!user) {
    const err = new CustomError("user not found", 404);
    return next(err);
  }

  //here we cant perform delete key on mongoose documnet so we convert into javascript object
  let userWithoutPassword = user.toObject();
  delete userWithoutPassword["password"];

  req.user = userWithoutPassword;
  next();
});

//Admin authentication
exports.isAdmin = asyncErrorHandler((req, res, next) => {
  if (req.user.role !== "admin") {
    const err = CustomError("only admin access this resource", 401);
    return next(err);
  }
  next();
});
