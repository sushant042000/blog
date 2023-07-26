const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "please login to access this resource",
    });
  }

  const decoded = await jwt.decode(token, process.env.JWT_SECRETE);
  const user = await User.findById({ _id: decoded.id });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  //here we cant perform delete key on mongoose documnet so we convert into javascript object
  let userWithoutPassword = user.toObject();
  delete userWithoutPassword["password"];

  req.user = userWithoutPassword;
  next();
};

module.exports = isAuthenticated;
