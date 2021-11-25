const mongoose = require('mongoose')
const {Schema} = require("mongoose");

var applicationSchema = new mongoose.Schema({

    postDate:Date,
    applyDate: Date,
    applyDeadline:Date,

    company: String,
    jobPosition: String,
    jobType:String,
    jobLocation:String,
    qualifications:String,
    termLength:String,
    startTime:Date,
    jobDuty:String,
    salary:String,
    experience:String,
    education:String,

    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }



})

module.exports = mongoose.model("Application",applicationSchema)