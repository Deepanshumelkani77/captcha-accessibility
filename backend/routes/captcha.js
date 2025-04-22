// routes/captcha.js

const express = require("express");
const { solveCaptcha } = require("../controllers/captchaController");

const router = express.Router();

router.post("/solve", solveCaptcha);

module.exports = {
  captchaRoutes: router,
};
