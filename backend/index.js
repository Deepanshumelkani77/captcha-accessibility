const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { captchaRoutes } = require("./routes/captcha");

dotenv.config();
const app = express();

// CORS configuration for better security and performance
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Allow credentials (cookies, authentication headers)
};

app.use(cors(corsOptions)); // Apply CORS options
app.use(express.json());
app.use('/api/captcha', captchaRoutes);

const port = 5000;
app.listen(port, () => {
  console.log("Server starting at port:", port);
});

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://deepumelkani123:Deepak123@cluster0.aujdhik.mongodb.net/captcha_accessibility?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

connectDB();
