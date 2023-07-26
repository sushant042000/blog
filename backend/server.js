const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bodyParser=require("body-parser");
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;
const cookieParser=require("cookie-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());


const userRoutes = require("./routes/userRoutes");
app.use("/api/v1", userRoutes);

const dbconnection = require("./config/db.js");

dbconnection();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
