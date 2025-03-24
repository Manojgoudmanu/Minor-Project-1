import React, { useState } from "react";
import "./Forgot.css";  

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://api.example.com/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Your new password: ${data.newPassword}`);
      } else {
        setMessage("Error: Unable to send reset link. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please check your connection.");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-form">
 
        <img src="/wallet icon.png" alt="Wallet Icon" className="forgot-logo" />
        <h1>Personal Expense Tracker</h1>
        <h3>Forgot Password</h3>
        <p>Enter your email to reset your password</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        <p><a href="/login">Sign In</a></p>
        {message && <p className="password-message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;