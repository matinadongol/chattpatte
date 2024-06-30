const jwt = require("jsonwebtoken")
const USER = require("../model/userSchema")
const secretKey = process.env.KEY

const authenticate = async(req, res, next) => {
  try{
    const token = req.cookies.Chattpatte
    const verifyToken = jwt.verify(token, secretKey)
    console.log("verify token: ", verifyToken)
    const rootUser = await USER.findOne({_id:verifyToken._id, "tokens.token": token})
    if(!rootUser){
      throw new Error("User not found!")
    }
    req.token = token
    req.rootUser = rootUser
    req.userID = rootUser._id
    next()
    console.log("Root user: ", rootUser)
  } catch(error){
    res.status(401).send("unauthorized user: No token provided")
    console.log("authenticate error", error)
  }
}

module.exports = authenticate