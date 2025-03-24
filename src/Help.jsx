import React from "react";
import "./Help.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Help =() =>{
     const nav = useNavigate()
    return (
        <div className="help-container">
             <FontAwesomeIcon icon={faAnglesLeft} className="bon" onClick={()=>nav("/profile")} />   
        <h2>Helper's Information</h2>
        <div className="help-details">
        <p><strong>Email:</strong>manishsiddhantham@gmail.com</p> 
        <p><strong>Phone:</strong>9392415571</p>   
        </div>
        </div>
    );
};
export default Help;