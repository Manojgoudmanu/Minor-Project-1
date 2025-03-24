import React, { use, useContext, useEffect } from "react";
import Footer from "./Footer";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faReceipt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { fetchdata } from "./App";
import { useNavigate } from "react-router-dom";
import "./Add.css";
import axios from "axios";

const Add = () => {

  const { transactions, setTransactions, user, setUser } = useContext(fetchdata);
  const navigate = useNavigate();
  console.log(transactions, "add page transactions");

  const deletehandler = async(title,date,amount,color,sign,money) => {
    try{
    const response =await axios.patch(`http://localhost:3003/transactions/delete`,{
      email:user.email,
      title,
      date,
      amount,
      sign,
      color,
      money


    })
    if(response.data.sucess){
      const filtered = transactions.filter(
        (ts)=>!(ts.title === title && ts.date === date && ts.amount === amount && ts.money === money && ts.sign === sign && ts.color === color)
      )
      setTransactions(filtered);
      console.log(`trans deleted sucessfully`)
    }
  }catch(error){
    console.error(`error in deletng transactions ${error}`)

  }

  };

  return (
    <div>
      <div className="add-container">
        <div className="add-form">
          <h1>Add</h1>
          <div className="buttons">
            <button className="income" onClick={() => navigate("/income")}>
              <FontAwesomeIcon icon={faWallet} className="icon" /> Add Money
            </button>
            <button className="expense" onClick={() => navigate("/Expense")}>
              <FontAwesomeIcon icon={faReceipt} className="icon" /> Add Expense
            </button>
          </div>
          <h3>Last Added</h3>
          <div className="transactions">
            {user && transactions && transactions.length > 0 ? (
              transactions.map((ts, index) => (
                <div
                  key={index}
                  className={`transaction-item ${
                    ts.money === "Income" ? "incomebox" : "expensebox"
                  }`}
                >
                  <div>
                    <p className="transaction-name">{ts.title}</p>
                    <p className="transaction-date">{ts.date}</p>
                  </div>
                  <p className={`transaction-amount ${ts.color}`}>
                    {ts.sign}
                    {ts.amount}
                  </p>
                  <button
                    className="deletebutton"
                    onClick={() => deletehandler(ts.title, ts.date, ts.amount, ts.color, ts.sign, ts.money)}

                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))
            ) : (
              <p>No transactions added yet.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Add;
