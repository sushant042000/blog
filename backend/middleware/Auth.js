const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/custumError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");


exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    next(new ErrorHandler("please login to access this resource", 401));
  }

  const decoded = await jwt.decode(token, process.env.JWT_SECRETE);
  const user = await User.findById({ _id: decoded.id });

  if (!user) {
    next(new ErrorHandler("user not found", 404));
  }
  //here we cant perform delete key on mongoose documnet so we convert into javascript object
  let userWithoutPassword = user.toObject();
  delete userWithoutPassword["password"];

  req.user = userWithoutPassword;
  next();
});



exports.isAdmin =asyncErrorHandler( (req, res, next) => {
  if (req.user.role !== "admin") {
    next(new ErrorHandler("only admin access this resource", 401));
  }
  next();
});
