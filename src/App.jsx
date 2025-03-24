import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate

import "./App.css";
import "./Home.css";
import Home from "./Home";
import "./Footer.css";
import Welcome from "./Welcome";
import Signup from "./Signup";
import Login from "./Login";
import Forgot from "./Forgot";
import Add from "./Add";
import Income from "./Income";
import Expense from "./Expense";
import Statics from "./Statics";
import Profile from "./Profile";
import AccountInfo from "./AccountInfo";
import PrivacyPolicy from "./PrivacyPolicy";
import SecurityCode from "./SecurityCode";
import Logout from "./Logout";
import Help from "./Help";
import Notifications from "./NotificationCard";
import photo from './assets/1.jpg';

export const fetchdata = createContext();

function App() {
   
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(() => {
    // 🔍 Load user from localStorage on first render
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  let [count, setCount] = useState(0);
  let [routes, setRoutes] = useState(false);
  

 
  useEffect(() => {
    if (user) {
      console.log("✅ User logged in:", user);
      localStorage.setItem("user", JSON.stringify(user)); // Save user in localStorage
    } else {
      console.log("❌ User logged out or null");
      localStorage.removeItem("user"); // Remove user from storage on logout
    }
  }, [user]);

  useEffect(() => {
    if (user && user.email) { // Only fetch transactions when user is logged in
      axios
        .get(`http://localhost:3003/transactions/${user.email}`)
        .then((resp) => {
          // console.log(resp.data);
          setTransactions(resp.data);
          // console.log(resp);
          
        })
        .catch((error) => console.error("Error fetching transactions:", error));
    }
  }, [user, count]);
  

  return (
    <div
    
  >
    <fetchdata.Provider
      value={{ transactions, setTransactions, user, setUser, count, setCount, routes, setRoutes }}
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Protected Routes: Redirect to Welcome if not logged in */}
        <Route path="/homepage" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/addexpense" element={user ? <Add /> : <Navigate to="/" />} />
        <Route path="/income" element={user ? <Income /> : <Navigate to="/" />} />
        <Route path="/expense" element={user ? <Expense /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="/account-info" element={user ? <AccountInfo /> : <Navigate to="/" />} />
        <Route path="/privacy-policy" element={user ? <PrivacyPolicy /> : <Navigate to="/" />} />
        <Route path="/security-code" element={user ? <SecurityCode /> : <Navigate to="/" />} />
        <Route path="/help" element={user ? <Help /> : <Navigate to="/" />} />
        <Route path="/logout" element={user ? <Logout /> : <Navigate to="/" />} />
        <Route path="/statics" element={user ? <Statics /> : <Navigate to="/" />} />
        <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/" />} />
      </Routes>
    </fetchdata.Provider>
    </div>
  );
}

export default App;
