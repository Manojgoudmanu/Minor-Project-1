import React,{useContext} from "react";
import "./AccountInfo.css";
import { fetchdata } from "./App";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

const AccountInfo = () => {
  const {user, setUser} = useContext(fetchdata)
  const nav = useNavigate()
  return (
    <div className="account-container">
      <FontAwesomeIcon icon={faAnglesLeft} className="but" onClick={()=>nav("/profile")} /> 
      <h2>Account Information</h2>
      <div className="account-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
       
    </div>
  );
};

export default AccountInfo;