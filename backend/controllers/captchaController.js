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
    const solveURL = `http://localhost:7000/captcha/solve`;
  
    const preprocessed = await axios.post(preprocessURL, { data }, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("Preprocess response:", preprocessed.data);
  
    if (!preprocessed.data?.processed) {
      throw new Error("Preprocessing failed: no 'processed' field in response");
    }
  
    const result = await axios.post(solveURL, {
      type,
      data: preprocessed.data.processed,
    });
  
    console.log("Solver result:", result.data);
  
    const log = new Log({ ...result.data, timestamp: new Date(), type });
    await log.save();
  
    res.json(result.data);
  } catch (err) {
    console.error("🔥 ERROR DETAILS 🔥");
  
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
      console.error("Headers:", err.response.headers);
      
      // Custom error messages based on status code
      if (err.response.status === 400) {
        res.status(400).json({ message: "Bad request", details: err.response.data });
      } else if (err.response.status === 404) {
        res.status(404).json({ message: "Service not found", details: err.response.data });
      } else {
        res.status(500).json({ message: "Internal server error", details: err.response.data });
      }
    } else if (err.request) {
      console.error("No response received:");
      console.error(err.request);
      res.status(500).json({ message: "No response from external service" });
    } else {
      console.error("Error message:", err.message);
      res.status(500).json({ message: "Internal server error", detail: err.message });
    }
  }
}; 





module.exports = { solveCaptcha };
