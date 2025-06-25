import React, { useState } from "react";
import "./SignUp.css"

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(data.message);
        setMessageType('success');
      } else {
        setMessage(data.message || 'Something wrong.');
        setMessageType('error');
      }

    } catch (error) {
      console.error(error);
      setMessage('Connecting to the server error.');
      setMessageType('error');
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" onChange={handleChange} />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={handleChange} />
        </div>
        <div className="form-row">
          <label htmlFor="confirm-password">Confirm password</label>
          <input type="password" id="confirm-password" name="confirm-password" onChange={handleChange} />
        </div>
        <div className="form-button"><button type="submit">Save</button></div>
      </form>
    </div>
  )
}

export default SignUp;