const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary");
const CustomError = require("./utils/custumError");
const globalErrorHandler = require("./middleware/globalErrorHandler");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const dbconnection = require("./config/db.js");

dbconnection();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const userRoutes = require("./routes/userRoutes");
const postRoutes=require("./routes/postsRoutes");

app.use("/api/v1", userRoutes);
app.use("/api/v1/post", postRoutes);

//default route error handling
app.all("*", (req, res, next) => {
  const err = new CustomError( `cant find ${req.originalUrl} on the server`, 404);
  next(err);
});

//global error hangling
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
