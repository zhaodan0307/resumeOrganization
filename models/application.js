const mongoose = require('mongoose')
const {Schema} = require("mongoose");

var ApplicationSchema = new mongoose.Schema({

    postDate:date,
    applyDate: date,
    applyDeadline:date,

    company: string,
    jobPosition: string,
    jobType:string,
    jobLocation:string,
    qualifications:string,
    termLength:string,
    startTime:date,
    jobDuty:string,
    salary:string,
    experience:string,
    education:string,

    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }



})

module.exports = mongoose.model("Application",ApplicationSchema)