const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  id:String,
  image:String,
  itemName:String,
  description:String,
  originalPrice:String,
  currentPrice:String,
  discountPercentage:String,
  deliveryDate:String,
  ratings:Object,
},{timeStamps:true});

const itemsdb = new mongoose.model("items", itemsSchema);

module.exports = itemsdb;

