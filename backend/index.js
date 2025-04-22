const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
//app.use('/api/captcha',captchaRoutes);

const port = 5000;
app.listen(port, () => {
  console.log("server starting at port:", port);
});

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://deepumelkani123:Deepak123@cluster0.aujdhik.mongodb.net/captcha_accessibility?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database connect successfully");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

connectDB();
