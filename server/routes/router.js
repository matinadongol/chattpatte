const express = require("express");
const router = new express.Router()
const itemsdb = require("../model/itemsSchema");
const userdb = require("../model/userSchema")
const messagesdb = require("../model/messageSchema")
const bcrypt = require("bcryptjs");
const { use } = require("passport");
const authenticate = require("../middleware/authenticate")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const secretKey = process.env.KEY

//email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

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
    //console.log("individualData:", individualData)
    res.status(201).json(individualData)
  } catch(error){
    res.status(400).json(individualData)
    console.log("error: " + error.message)
  }
})

//user login 
router.post("/login", async(req,res) => {
  // console.log(req.body)
  const {email, password} = req.body
  if(!email || !password){
    res.status(422).json({error: "Fill all the data"})
  }
  try{
    const userLogin = await userdb.findOne({email: email})
    //console.log("userLogin: ", userLogin)
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
      return
    } 
    if (password !== retypePassword){
      res.status(422).json({error: "password and retype password doesnot match"})
      return
    } 
    const finalUser = new userdb({
      displayName, email, password, retypePassword
    })
    const storedData = await finalUser.save()
    console.log(storedData)
    res.status(201).json(storedData)
    
  } catch(error){
    console.error("Error during signup:", error);
    if (error.code === 11000) { // MongoDB duplicate key error
      res.status(422).json({ error: "Email already in use" });
    } else {
      res.status(500).json({ error: "Something went wrong, please try again later" });
    }
  }
})

//user logout
router.get("/logout", authenticate, async(req, res) => {
  try{
    req.rootUser.tokens = req.rootUser.tokens.filter((currentElement) => {
      return currentElement.token !== req.tokens
    })
    res.clearCookie("Chattpatte", {path: "/"})
    req.rootUser.save()
    res.status(201).json(req.rootUser.tokens)
    console.log("user logout successful")
  } catch(error){
    console.log("error while trying to logout")
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

//send Message 
router.post("/sendMessage", async(req,res) => {
  // console.log('Received message')
  // console.log('Request body:', req.body)
  const {fullName, email, message} = req.body
  if (!fullName || !email || !message){
    res.status(422).json({error: "Fill all the data"})
    console.log("no data available")
  }
  try{
    const newMessage = new messagesdb({
      fullName, email, message
    })
    const storedData = await newMessage.save()
    //console.log(storedData)
    res.status(201).json(storedData)
    
  } catch(error){
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Something went wrong, please try again later" })
  }
})

//send link to email for password reset
router.post("/sendPasswordLink", async(req, res) => {
  //console.log(req.body)
  const {email} = req.body
  if(!email){
    res.status(401).json({status:401, message:"Enter your email"})
  }
  try{
    const userFind = await userdb.findOne({email: email})
    const token = jwt.sign({_id:userFind._id}, secretKey, {
      expiresIn: "120s"
    })
    console.log("sendforgotpasswordLink token: ", token)
    const setUserToken = await userdb.findByIdAndUpdate({_id:userFind._id}, {verifyToken:token}, {new: true})
    //console.log("setUserToken: ", setUserToken)
    if(setUserToken){
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Chattpatte: Link to reset your password.",
        text: `This link is valid for 2 minutes. Click to reset your password: http://localhost:3000/forgotPassword/${userFind.id}/${setUserToken.verifyToken}`
      }
      transporter.sendMail(mailOptions, (error, info)=> {
        if(error){
          console.log("transporter sendMail error: ", error)
          res.status(401).json({status: 401, message: "email not sent"})
        } else {
          //console.log("transporter email sent: ", info)
          res.status(201).json({status: 201, message: "email sent successfully."})
        }
      })
    }
  } catch(error){
    console.log("send password link error: ", error)
    res.status(401).json({status: 401, message: "invalid user"})
  }
})

//verify user for forgot password link
router.get("/forgotPassword/:id/:token", async(req, res) => {
  const {id, token} = req.params
  try{
    const validUser = await userdb.findOne({_id:id, verifyToken:token})
    //console.log("validUser: ", validUser)
    const verifyToken = jwt.verify(token, secretKey)
    console.log("forgotPassword verifyToken: ", verifyToken)
    if(validUser && verifyToken._id){
      res.status(201).json({status: 201, validUser})
    } else {
      res.status(401).json({status: 401, message: "user doesnot exist"})
    }
  } catch(error){
    console.log("forgotPassword verifyToken error: ", error)
    res.status(401).json({status: 401, error})
  }
})

//change password
router.post("/:id/:token", async(req, res) => {
  const {id, token} = req.params
  const { password } = req.body
  console.log(`Received request to change password for user ${id} with token ${token}`);
  try{
    const validUser = await userdb.findOne({_id:id, verifyToken:token})
    //console.log("validUser: ", validUser)
    if (!validUser) {
      return res.status(401).json({ status: 401, message: "User does not exist" });
    }

    const verifyToken = jwt.verify(token, secretKey)
    console.log("change Password verifyToken: ", verifyToken)
    if (verifyToken._id !== id) {
      return res.status(401).json({ status: 401, message: "Token does not match user ID" });
    }

    if(validUser && verifyToken._id){
      const newPassword = await bcrypt.hash(password, 12)
      const setNewUserPassword = await userdb.findByIdAndUpdate({_id:id}, {password:newPassword, retypePassword:newPassword})
      setNewUserPassword.save()
      res.status(201).json({status: 201, setNewUserPassword})
    } else {
      res.status(401).json({status: 401, message: "user doesnot exist"})
    }
  } catch(error){
    console.log("change Password verifyToken error: ", error)
    res.status(401).json({ status: 401, message: "Token verification failed", error })
  }
})

module.exports = router