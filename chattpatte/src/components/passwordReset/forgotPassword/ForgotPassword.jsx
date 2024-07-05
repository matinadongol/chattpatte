import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  const [message, setMessage] = useState(false)
  const [linkExpired, setLinkExpired] = useState(false)
  const {id, token} = useParams()
  const navigate = useNavigate()

  const setValue=(e)=>{
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "retypePassword") {
      setRetypePassword(e.target.value)
    }
  }
  const sendPassword = async(e) => {
    e.preventDefault()
    if (password !== retypePassword) {
      alert("Passwords do not match!");
      return;
    }

    const res = await fetch(`/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    })
    const data = await res.json()
    if(data.status == 201 ){
      setPassword("")
      setRetypePassword("")
      setMessage(true)
    } else {
      //console.log("invalid email")
      //alert(data.message)
    }
  }
  const userValid = async()=> {
    const res = await fetch(`/forgotPassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await res.json()
    if(data.status == 201){
      //console.log("user valid")
    } else {
      //console.log("user invalid")
      setLinkExpired(true)
    }
  }
  useEffect(()=>{
    userValid()
  }, [])

  useEffect(() => {
    if (linkExpired) {
      alert("Link expired, please enter your email again.");
      navigate("/resetPassword");
    }
  }, [linkExpired, navigate])
  return (
    <>
      <div className="loginContainer">
        <form className="loginForm" method="POST">
          <h2>Reset Password</h2>
          {message ? 
            <>
            <span>Password successfully changed. Please Login to continue.</span> 
            <Link className="textButton" to="/login">
              Log in
            </Link>
            </> : 
            <>
              <div className="formGroup">
                <label>Enter your new password</label>
                <input
                  type="password"
                  required
                  name="password"
                  id="password"
                  value={password}
                  onChange={setValue}
                />
              </div>
              <div className="formGroup">
                <label>Re-enter your new password</label>
                <input
                  type="password"
                  name="retypePassword"
                  id="retypePassword"
                  value={retypePassword}
                  onChange={setValue}
                />
              </div>
              <div className="signInButton">
                <button type="submit" className="greenbutton" onClick={sendPassword}>
                  Save
                </button>
              </div>
            </>
          }
        </form>
      </div>
    </>
  )
}