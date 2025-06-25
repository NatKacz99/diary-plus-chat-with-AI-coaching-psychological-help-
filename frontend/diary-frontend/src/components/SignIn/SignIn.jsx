import React from "react";
import "./SignIn.css"

function SignIn() {
  return (
    <div className="signin-form">
      <form>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" autoComplete="off" />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="form-button"><button type="submit">Save</button></div>
      </form>

      <div className="sign-in-with-google">
        <a href="http://localhost:3000/auth/google" role="button">
          <i className="fab fa-google"></i>
          Sign In with Google
        </a>
      </div>
    </div>
  )
}

export default SignIn