import React, { useState } from "react";
import "./Signup.css";  
import axios from 'axios'
import { useNavigate } from "react-router-dom";
 

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const nav = useNavigate()
  const [log,setLog] =useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSubmit(name);
    console.log("User Data:", { name, email, password, confirmPassword });

    const userData = {
      name,
      email,
      password,
      confirmPassword
    }

   try{
if(userData.password !== userData.confirmPassword){

  setError("you have an ERROR 🌋:paswords do not match ")
   return
}

  const signupdetails = await axios.post('http://localhost:3003/signin',(userData));

  setSucess("sucessfull, you can log-in")
  setLog(" login")


    
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("")
   }catch(error){
      setError("you have and error in sign up,please try again ")

    }
  
  
  
  
  };
  


  return (
    <div className="signup-container">
      <div className="signup-form">
      <img src="./wallet icon.png" alt="Logo" className="signup-logo" />
        <h1>Personal Expense Tracker</h1>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <input 
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
          />
         {error &&  <p>{error}</p>}
          {sucess && <p>{sucess}</p>}
         <button type="submit">   Sign Up  </button> 
        </form>
       <p> 
        Already have an account! <a href="/login">Login</a>
       </p>
      </div>
    </div>
  );
};

export default SignUp;