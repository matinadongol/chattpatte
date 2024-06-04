import React, { useState }  from "react";
import './Login.css';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === retypePassword) {
      // Handle form submission
      console.log('Form submitted:', { email, password });
    } else {
      alert('Passwords do not match');
    }
  };

  const loginWithGoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self")
  }
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
        <div className="formGroup">
          <label>Retype Password</label>
          <input
            type="password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            required
          />
        </div>
        <div className="loginButtons">
          <button type="submit" className="greenbutton">Create</button>
          <button type="button" className="googleButton" onClick={loginWithGoogle}>Sign in with Google</button>
        </div>
        
      </form>
    </div>
      </>
    );
}