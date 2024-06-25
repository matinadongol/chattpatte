import React, { useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === retypePassword) {
      console.log("Form submitted:", { email, password });
    } else {
      alert("Passwords do not match");
    }
  };

  const loginWithGoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self");
  };
  return (
    <>
      <div className="loginContainer">
        <form className="loginForm" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="formGroup">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            <button type="submit" className="greenbutton">
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
