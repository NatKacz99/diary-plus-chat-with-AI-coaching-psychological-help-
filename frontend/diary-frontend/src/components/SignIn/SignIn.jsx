import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import PropTypes from 'prop-types';
import "./SignIn.css"

function SignIn({setToken}) {
  const { user, setUser } = useContext(UserContext);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.removeItem("userData");
        localStorage.setItem('userData', JSON.stringify({
          id: data.user.id,
          username: data.user.name,
          email: data.user.email,
          token: data.token
        }));
        setUser(data.user);
        navigate("/");
      } else {
        setMessage("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="signin-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" autoComplete="off"
            onChange={e => setUserName(e.target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"
            onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="form-button"><button type="submit">Log in</button></div>
        {message && (
          <p className="alert-error">{message}</p>
        )}
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

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default SignIn