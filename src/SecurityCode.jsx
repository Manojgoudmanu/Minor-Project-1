import React, { useState } from "react";
import "./SecurityCode.css"; 

const SecurityCode = () => {
  const [pin, setPin] = useState(localStorage.getItem("securityPin") || "");
  const [inputPin, setInputPin] = useState("");

  const handleSetPin = () => {
    localStorage.setItem("securityPin", pin);
    alert("Security PIN Set!");
  };

  const handleVerifyPin = () => {
    if (inputPin === localStorage.getItem("securityPin")) {
      alert("Access Granted!");
    } else {
      alert("Incorrect PIN!");
    }
  };

  return (
    <div className="security-container">  
      <div className="security-box">  
        <h1>Security Code</h1>
        <h2>Set Security PIN</h2>
        <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} />
        <button onClick={handleSetPin}>Save PIN</button>

        <h2>Enter PIN to Unlock</h2>
        <input type="password" value={inputPin} onChange={(e) => setInputPin(e.target.value)} />
        <button onClick={handleVerifyPin}>Verify PIN</button>
      </div>
    </div>
  );
};

export default SecurityCode;