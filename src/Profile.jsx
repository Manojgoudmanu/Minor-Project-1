import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faHeadset, faRightFromBracket ,faCircleLeft} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; 
import "./Profile.css";
import { fetchdata } from "./App";
import Footer from "./Footer";


const Profile = () => {
  const{user} = useContext(fetchdata)
  const navigate = useNavigate();
  return (
    <div className="profile-container">
      
      <div className="profile-header">
      
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
      </div>
      <div className="profile-options">
     
        <button className="option account" onClick={() => navigate('/account-info')}>
          <FontAwesomeIcon icon={faUser} className="icon" /> Account Info
        </button>
        <button className="option privacy" onClick={() => navigate('/privacy-policy')}>
          <FontAwesomeIcon icon={faLock} className="icon" /> Privacy Policy
        </button>
        <button className="option help" onClick={() => navigate('/help')}>
          <FontAwesomeIcon icon={faHeadset} className="icon" /> Help
        </button>
        <button className="option logout" onClick={() => navigate('/logout')}>
          <FontAwesomeIcon icon={faRightFromBracket} className="icon" /> Logout
        </button>
      </div>
     <Footer/>
    </div>
  );
};

export default Profile;