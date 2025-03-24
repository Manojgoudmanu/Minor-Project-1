import React from "react";
import "./PrivacyPolicy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const PrivacyPolicy = () => {
  const nav = useNavigate()
  return (
    
    <div className="privacy-container">
     <FontAwesomeIcon icon={faAnglesLeft} className="buto" onClick={()=>nav("/profile")} />   
      <h1>Privacy Policy</h1>
      <p>Last updated: March 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to our Expense Tracker. Your privacy is important to us, and we are committed to
          protecting your personal information.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>
          We collect the following data:
          <ul>
            <li>Personal details (name, email, etc.)</li>
            <li>Expense details (amount, category, date)</li>
            <li>Login credentials (secured with encryption)</li>
          </ul>
        </p>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>Your data is used to:</p>
        <ul>
          <li>Track and categorize expenses</li>
          <li>Improve user experience</li>
          <li>Ensure account security</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>
          We implement security measures like encryption and authentication to protect your data.
          However, no system is 100% secure.
        </p>
      </section>

      <section>
        <h2>5. Contact Us</h2>
        <p>
          If you have any questions, reach out to us at: 
          <a href="mailto:support@expensetracker.com"> support@expensetracker.com</a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;