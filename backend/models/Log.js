// models/Log.js

const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  challengeHash: String,
  type: String,
  timeStamp: Date,
  solution: String,
  confidence: Number,
});

// Use CommonJS syntax to export the model
module.exports = mongoose.model('Log', logSchema);
