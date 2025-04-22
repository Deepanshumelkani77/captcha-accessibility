// controllers/captchaController.js

const axios = require("axios");
const Log = require("../models/Log");

// const solveCaptcha = async (req, res) => {
//   const { type, data } = req.body;
//   try {
//     const preprocessURL = `http://localhost:6000/preprocess/${type}`;
//     const solveURL = `http://localhost:7000/solve`;

//     const preprocessed = await axios.post(preprocessURL, { data });
//     const result = await axios.post(solveURL, {
//       type,
//       data: preprocessed.data,
//     });

//     const log = new Log({ ...result.data, timestamp: new Date(), type });
//     await log.save();

//     res.json(result.data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// 


const solveCaptcha = async (req, res) => {
  const { type, data } = req.body;
  console.log("Received request:");
  console.log("Type:", type);
  console.log("Data (preview):", typeof data === 'string' ? data.slice(0, 100) : data);

  try {
    const preprocessURL = `http://localhost:6000/preprocess/${type}`;
    const solveURL = `http://localhost:7000/solve`;

    const preprocessed = await axios.post(preprocessURL, { data });
    console.log("Preprocessed data:", preprocessed.data);

    const result = await axios.post(solveURL, {
      type,
      data: preprocessed.data,
    });

    console.log("Result from solver:", result.data);

    const log = new Log({ ...result.data, timestamp: new Date(), type });
    await log.save();

    res.json(result.data);
  } catch (err) {
    console.error("Error solving CAPTCHA:", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { solveCaptcha };