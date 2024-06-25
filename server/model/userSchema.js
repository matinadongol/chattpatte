const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")

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
  //image:String,
  // token:[
  //   {
  //     token: {
  //       type: String,
  //       //required: true
  //     }
  //   }
  // ],
  // carts: Array
},{timeStamps:true});

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 12)
    this.retypePassword = this.password
  }
  next()
})

const userdb = new mongoose.model("users", userSchema)

module.exports = userdb;
