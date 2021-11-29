const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const plm = require('passport-local-mongoose')


let appUserSchema = new Schema({
    username:String,
    password:String,
    oauthProvider: String,
    oauthId: String,

    applications:
        [{
            type:Schema.Types.ObjectId,
            ref: "Application"
        }]

})

appUserSchema.plugin(plm)

 module.exports = mongoose.model("User",appUserSchema);