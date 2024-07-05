import React, { useState } from "react";

export default function PasswordReset() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState(false)

  const setValue = (e) => {
    setEmail(e.target.value)
  }

  const sendLink = async(e) => {
    e.preventDefault()
    const res = await fetch("/sendPasswordLink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })
    const data = await res.json()
    if(data.status == 201 ){
      setEmail("")
      setMessage(true)
    } else {
      console.log("invalid email")
    }
  }

  return (
    <>
      <div className="loginContainer">
        <form className="loginForm" method="POST">
          <h2>Reset Password</h2>
          {message ? 
            <span>Password reset link has been sent. Please check your email.</span> : 
            <>
              <div className="formGroup">
                <label>Enter your Email</label>
                <input
                  type="email"
                  required
                  name="email"
                  id="email"
                  value={email}
                  onChange={setValue}
                />
              </div>
              <div className="signInButton">
                <button type="submit" className="greenbutton" onClick={sendLink}>
                  Send
                </button>
              </div>
            </>
          }
        </form>
      </div>
    </>
  );
}
