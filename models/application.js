const mongoose = require('mongoose')
const {Schema} = require("mongoose");

var applicationSchema = new mongoose.Schema({


    postDate:Date,
    applyDate:Date,
    applyDeadline:Date,
    startTime:Date,

    company:String,
    position:String,
    type:String,
    location:String,
    qualification:String,
    term:String,
    duty:String,
    salary:String,
    experience:String,
    education:String,
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }



})

module.exports = mongoose.model("Application",applicationSchema);