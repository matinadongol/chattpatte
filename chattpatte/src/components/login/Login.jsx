import React, { useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  //console.log("loginData: ", loginData)

  const addData = (e) => {
    const {name, value} = e.target
    setLoginData(() => {
      return {
        ...loginData, [name]: value
      }
    })
  }

  const sendData = async (e) => {
    e.preventDefault(e);
    const { email, password} = loginData;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password})
    })
    const data = await res.json();
    console.log("login data: ", data)
    if(res.status == 400 || !data){
      console.log("invalid details")
    } else {
      console.log("valid details")
      setLoginData({...loginData, email:"", password:""})
    }
  }

  const loginWithGoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self");
  };
  return (
    <>
      <div className="loginContainer">
        <form className="loginForm" method="POST">
          <h2>Login</h2>
          <div className="formGroup">
            <label>Email</label>
            <input
              type="email"
              value={loginData.email}
              onChange={addData}
              required
              name="email"
              id="email"
            />
          </div>
          <div className="formGroup">
            <label>Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={addData}
              required
              name="password"
              id="password"
            />
          </div>
          <div className="rememberMeForgetPassword">
            <div className="rememberMe">
              <input type="checkbox" id="rememberMe" />
              <label>Remember me</label>
            </div>
            <div className="forgotPasswordSection">
              <button className="textButton">Forgot Password</button>
            </div>
          </div>
          <div className="signInButton">
            <button type="submit" className="greenbutton" onClick={sendData}>
              Log In
            </button>
          </div>
          <div className="signInWithGoogle">
            <h6>Or sign in with google</h6>
            <button
              type="button"
              className="googleButton"
              onClick={loginWithGoogle}
            >
              <span className="googleLogo"></span>Google
            </button>
          </div>
          <div className="createAccount">
            <h6>Dont have an account?</h6>
            <Link className="textButton" to="/signUp">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}