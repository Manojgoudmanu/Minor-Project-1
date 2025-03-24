import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("userToken");  
  //   // alert("You have been logged out!");
  //   navigate("/"); 
  // };

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h2>Are you sure you want to log out?</h2>
        <button className="logout-btn" onClick={()=>navigate('/')}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;