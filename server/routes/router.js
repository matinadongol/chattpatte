const express = require("express");
const router = new express.Router()
const itemsdb = require("../model/itemsSchema");

//get items data
router.get("/getItems", async(req,res) => {
  try{
    const itemsData = await itemsdb.find()
    //console.log("console the data:", itemsData)
    res.status(201).json(itemsData)
  } catch(error){
    console.log("error: " + error.message)
  }
})

//get individual item data
router.get("/getItemsByID/:id", async(req,res) => {
  try{
    const {id} = req.params
    const individualData = await itemsdb.findOne({id:id})
    console.log("individualData:", individualData)
    res.status(201).json(individualData)
  } catch(error){
    res.status(400).json(individualData)
    console.log("error: " + error.message)
  }
})

module.exports = router