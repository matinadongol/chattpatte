//https://www.youtube.com/watch?v=RiF_-agfvtA

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn")
const PORT = 6005;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema");

const clientID = "1059565395072-8c5vsgrnfva4aubaduoobupan1fni87i.apps.googleusercontent.com"
const clientSecret = "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"

app.use(cors({
  origin: "http://localhost:3000",
  method: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());

//session start
app.use(session({
  secret:"qertyuiopasdfghjkl",
  resave:false,
  saveUninitialized:true
}))

//setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy({
    clientID:clientID,
    clientSecret:clientSecret,
    callbackURL:"/auth/google/callback",
    scope:["profile", "email"]
  },
  async(accessToken,refreshToken,profile,done)=>{
    console.log("profile", profile);
    try{
      let user = await userdb.findOne({googleId:profile.id});
      if(!user){
        user = new userdb({
          googleId:profile.id,
          displayName:profile.displayName,
          email:profile.emails[0].value,
          image:profile.photos[0].value
        });
        await user.save();
      }
      return done(null,user)
    } catch(error){
      return done(error, null)
    }
  }
  )
)

passport.serializeUser((user,done)=>{
  done(null,user);
})

passport.deserializeUser((user,done)=>{
  done(null,user);
})

//initial google oauth login
app.get("/auth/google", passport.authenticate("google",{scope:["profile", "email"]}));

app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:3000/",
  failureRedirect: "http://localhost:3000/login"
}))

app.get("/login/success", async(req,res)=> {
  //console.log("request user", req.user)
  if(req.user){
    res.status(200).json({message:"user Login", user:req.user})
  } else {
    res.status(400).json({message:"not authorized"})
  }
})

app.get("/logout", (req,res,next)=> {
  req.logout(function(err){
    if(err){
      return next(err)
    }
    res.redirect("http://localhost:3000/");
  })
})

app.listen(PORT, ()=>{
  console.log(`server start at port no ${PORT}`)
})