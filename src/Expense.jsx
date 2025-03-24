import React, { useContext, useRef, useState } from "react";
import "./Expense.css";
import { fetchdata } from "./App";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Expense = () => {
  let { transactions, setTransactions,count, setCount,user} = useContext(fetchdata);


  const dateref = useRef();
  const titleref = useRef();
  const amountref = useRef();
   const nav = useNavigate()

  const handlesubmit = async (e)=>{
    e.preventDefault()
    const newincome = {
      date:(dateref.current.value),
      title:(titleref.current.value),
      amount:(amountref.current.value),
      color:"red",
      sign:"-",
      money:"expense"
    }

    try{
      const response = await axios.post("http://localhost:3003/transactions/a", {
        email:user.email,  // Send email to match backend API
        transactions: newincome
      })
      setTransactions([...transactions,response.data])
      console.log(response.data);
      
      setCount(count + 1)
      

    }catch(error){
      console.log("error in posting the data",error)

    }
    
    // console.log(transactions)
    dateref.current.value= ""
    titleref.current.value=""
    amountref.current.value=""
  }

  return (
    <>
      <form onSubmit={handlesubmit} className="add-section">
        <FontAwesomeIcon icon={faAnglesLeft} className="bto" onClick={()=>nav("/addexpense")} />
        <h2 style={{ color: "white" }}>Add Expense</h2>
        <h4>Date</h4>
        <input type="date" className="input-field" ref={dateref} required />

        <h4>Expense Title</h4>
        <input type="text" className="input-field" ref={titleref} required />

        <h4>Amount</h4>
        <input
          type="number"
          className="input-field"
          min="0.00"
          step="0.01"
          ref={amountref}
          required
        />

        <button type="submit" className="add-income">
          Add Expense
        </button>
      </form>
    </>
  );
};

export default Expense;
