const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId:String,
  displayName:String,
  email:String,
  image:String
},{timeStamps:true});

const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;
