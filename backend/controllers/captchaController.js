const axios = require("axios");
const Log = require("../models/Log");

const solveCaptcha = async (req, res) => {
  const { type, data } = req.body;
  console.log("hello dev",req.body)

  console.log("Received request:");
  console.log("Type:", type);
  console.log("Data (preview):", typeof data === 'string' ? data.slice(0, 100) : data);

  try {
    const preprocessURL = `http://localhost:6000/preprocess/${type}`;
    const solveURL = `http://localhost:7000/solve`;

    // Make a POST request to the preprocessing service
    const preprocessed = await axios.post(preprocessURL, { data });
    console.log("Preprocessed data:", preprocessed.data);

    // Use the preprocessed data to solve the CAPTCHA
    const result = await axios.post(solveURL, {
      type,
      data: preprocessed.data.processed, // Accessing the 'processed' field from the response
    });

    console.log("Result from solver:", result.data);

    // Log the result
    const log = new Log({ ...result.data, timestamp: new Date(), type });
    await log.save();

    // Send the result back to the frontend
    res.json(result.data);
  } catch (err) {
    console.error("Error solving CAPTCHA:", err.response?.data || err.message); // Log the full error response
    res.status(500).json({ message: err.response?.data || err.message });
  }
};





module.exports = { solveCaptcha };
