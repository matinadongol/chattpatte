const express = require("express");
const router = new express.Router()
const itemsdb = require("../model/itemsSchema");
const userdb = require("../model/userSchema")

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

//user login 
router.get("/login", async(req,res) => {
  console.log(req.body)
})

//user sign up
router.post("/signUp", async(req, res) => {
  console.log('Received signUp request');
  console.log('Request body:', req.body);
  const {displayName, email, password, retypePassword} = req.body
  if (!displayName || !email || !password || !retypePassword){
    res.status(422).json({error: "Fill all the data"})
    console.log("no data available")
  }
  try{
    const preUser = await userdb.findOne({email: email})
    if(preUser){
      res.status(422).json({error: "User already exist"})
    } 
    if (password !== retypePassword){
      res.status(422).json({error: "password and retype password doesnot match"})
    } 
    const finalUser = new userdb({
      displayName, email, password, retypePassword
    })
    const storedData = await finalUser.save()
    //console.log(storedData)
    res.status(201).json(storedData)
    
  } catch(error){
    res.status(500).json({ error: "Something went wrong, please try again later" });
  }
})

module.exports = router