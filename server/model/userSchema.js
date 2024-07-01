const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secretKey = process.env.KEY

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    required: function () {
      return this.method === 'google'
    }
  },
  displayName:{
    type: String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error ("Not valid email address")
      }
    }
  },
  password:{
    type: String,
    minlength: 8,
    required: function() {
      return !this.googleId && this.method === 'form'
    }
  },
  retypePassword:{
    type: String,
    minlength: 8,
    required: function() {
      return !this.googleId;
    }
  },
  tokens:[
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  carts: Array
},{timeStamps:true});

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 12)
    this.retypePassword = this.password
  }
  next()
})

//generate token
userSchema.methods.generateAuthToken = async function (){
  try{
    let token = jwt.sign({_id:this._id}, secretKey)
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
  } catch(error){
    console.log("generating token error: ", error)
  }
}

//add to cart data
userSchema.methods.addCartData = async function (cart){
  try{
    this.carts = this.carts.concat(cart)
    await this.save()
    return this.carts
  } catch(error){
    console.log("add to cart data error: ", error)
  }
}

const userdb = new mongoose.model("users", userSchema)

module.exports = userdb;
