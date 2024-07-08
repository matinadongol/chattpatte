const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  id:String,
  fullName:String,
  email:String,
  message:String
},{ timestamps: true });

const messagesdb = new mongoose.model("messages", messageSchema);

module.exports = messagesdb;

