const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bodyParser=require("body-parser");
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;
const cookieParser=require("cookie-parser");
const cors=require("cors");
const cloudinary=require("cloudinary");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


const userRoutes = require("./routes/userRoutes");
app.use("/api/v1", userRoutes);

const dbconnection = require("./config/db.js");

dbconnection();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
