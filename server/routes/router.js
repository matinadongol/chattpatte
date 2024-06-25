const express = require("express");
const router = new express.Router()
const itemsdb = require("../model/itemsSchema");
const userdb = require("../model/userSchema")
const bcrypt = require("bcryptjs");
const { use } = require("passport");

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
router.post("/login", async(req,res) => {
  console.log(req.body)
  const {email, password} = req.body
  if(!email || !password){
    res.status(422).json({error: "Fill all the data"})
  }
  try{
    const userLogin = await userdb.findOne({email: email})
    console.log("userLogin: ", userLogin)
    if(userLogin){
      const isMatch = await bcrypt.compare(password, userLogin.password)
      //console.log(isMatch)
      const token = await userLogin.generateAuthToken()
      console.log("token in router: ", token)
      res.cookie("Chattpatte", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
      })
      if(!isMatch){
        res.status(400).json({error: "Invalid details"})
      } else {
        res.status(201).json(userLogin)
      }
    } else {
      res.status(400).json({error: "Invalid details"})
    }
  } catch(error){
    res.status(500).json({ error: "Invalid details" });
  }
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

//add to cart
router.post(".addToCart/:id", async(req, res) => {
  try{
    const {id} = req.params
    const cart = itemsdb.findOne({id:id})
    console.log("cart value: ", cart)
  } catch(error){
    console.log("add to cart error: ", error)
  }
})

module.exports = router