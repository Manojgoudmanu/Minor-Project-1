import React, { useContext, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchdata } from "./App";

const Login = () => {
  const { user, setUser,routes,setRoutes } = useContext(fetchdata);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sucess, setSucess] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3003/login", {
        email,
        password,
      });

      if (response.data.message === "login succesfull") {
        setTimeout(() => nav("/homepage"), 1000);
        setSucess(response.data.message);
        setUser(response.data.user);
        setRoutes(true)
        // console.log(user);

        setError("");
      } else {
        setError(response.data.message);
        setSucess("");
      }
    } catch (error) {
      setError("Data does not exists");
      setSucess("");
    }
 
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src="/wallet icon.png" alt="Logo" className="login-logo" />
        <h1>Personal Expense Tracker</h1>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        {sucess && <p>{sucess}</p>}
        {error && <p>{error}</p>}
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
