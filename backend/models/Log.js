const mongoose = require("mongoose");
const logSchema=new mongoose.Schema({
    challengeHash:String,
    type:String,
    timeStamp:Date,
    solution:String,
    confidence:Number,
});

export default mongoose.model('Log',logSchema);