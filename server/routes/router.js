const express = require("express");
const router = new express.Router()
const itemsdb = require("../model/itemsSchema");
const userdb = require("../model/userSchema")
const bcrypt = require("bcryptjs");
const { use } = require("passport");
const authenticate = require("../middleware/authenticate")

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
        expires: new Date(Date.now() + 10800000),
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
router.post("/addToCart/:id", authenticate, async(req, res) => {
  try{
    const {id} = req.params
    const cart = await itemsdb.findOne({id:id})
    console.log("cart value: ", cart)

    const UserContact = await userdb.findOne({_id:req.userID})
    console.log("user contact:", UserContact)
    if(UserContact){
      const cartData = await UserContact.addCartData(cart)
      await UserContact.save()
      console.log("cart data: ", cartData)
      res.status(201).json(UserContact)
    } else{
      res.status(401).json({error: "Invalid user"})
    }
  } catch(error){
    console.log("add to cart error: ", error)
  }
})

//get cart details
router.get("/cartDetails", authenticate, async(req, res)=> {
  try{
    const buyer = await userdb.findOne({_id: req.userID})
    console.log("cartDetails: ", buyer)
    res.status(201).json(buyer)
  } catch(error){
    console.log("cart details error: ", error)
  }
})

//get valid user
router.get("/validUser", authenticate, async(req, res)=> {
  try{
    const validUser = await userdb.findOne({_id: req.userID})
    console.log("cartDetails: ", validUser)
    res.status(201).json(validUser)
  } catch(error){
    console.log("cart details error: ", error)
  }
})

//remove item from cart
router.delete("/removeItem/:id", authenticate, async(req,res) => {
  try{
    const {id} = req.params
    req.rootUser.carts = req.rootUser.carts.filter((currentValue) => {
      return currentValue.id !== id
    })
    req.rootUser.save()
    res.status(201).json(req.rootUser)
    console.log("item removed from cart")
  } catch(error){
    res.status(400).json(req.rootUser)
    console.log("remove item from cart error: ", error)
  }
})

module.exports = router