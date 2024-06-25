import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/ReactToastify.css"

export default function SignUp() {
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    password: "",
    retypePassword: ""
  });
  //console.log("data: ", userData);
  const [message, setMessage] = useState(null)
  const addData = (e) => {
    const { name, value } = e.target;
    setUserData(() => {
      return {
        ...userData,
        [name]: value,
      };
    });
  };
  const sendData = async (e) => {
    e.preventDefault(e);
    const { displayName, email, password, retypePassword } = userData;
    console.log("button clicked")
    try {
      
      const res = await fetch("signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ displayName, email, password, retypePassword })
      });
      console.log('Full response object:', res);
      const data = await res.json();

      if (res.status === 201) {
        setMessage({ type: "success", text: "User signed up successfully" });
        console.log("User signed up successfully:", data);
        setUserData({...userData, googleId: "1234567890", displayName: "", email: "", password: "",
        retypePassword: ""})
        toast.success("sign up successful", {
          position: "top-center"
        })
      } else {
        setMessage({ type: "error", text: data.error });
        console.log("Error:", data.error);
        console.log("ERROR")
        toast.warning("invalid details", {
          position: "top-center"
        })
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Something went wrong, please try again later" });
    }
  };
  return (
    <>
      <div className="signUpContainer">
        <form className="signUpForm" method="POST" onSubmit={sendData}>
          <h2>Sign Up</h2>
          <div className="formGroup">
            <label>Full Name</label>
            <input type="Text" required onChange={addData} value={userData.displayName} name="displayName" id="displayName"/>
          </div>
          <div className="formGroup">
            <label>Email</label>
            <input type="email" required onChange={addData} value={userData.email} name="email" id="email"/>
          </div>
          <div className="formGroup">
            <label>Password</label>
            <input type="password" required onChange={addData} value={userData.password} name="password" id="password"/>
          </div>
          <div className="formGroup">
            <label>Retype Password</label>
            <input type="password" required onChange={addData} value={userData.retypePassword} name="retypePassword" id="retypePassword"/>
          </div>
          <div className="signUpButton">
            <button type="submit" className="greenbutton">
              Sign Up
            </button>
          </div>
          <div className="alreadyCreatedAccount">
            <h6>Already have an account?</h6>
            <Link className="textButton" to="/login">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
