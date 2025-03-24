import React, { useContext, useRef, useState } from "react";
import "./income.css";
import { fetchdata } from "./App";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const Income = () => {

  const {transactions,setTransactions,count,setCount,user} = useContext(fetchdata)
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
      color:"green",
      sign:"+",
      money:"Income"
    }

    try{
      const response = await axios.post("http://localhost:3003/transactions/a",{
        email:user.email,
        transactions:newincome})
      setTransactions([...transactions,response.data])
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
    <form onSubmit={handlesubmit} className="add-section">
       <FontAwesomeIcon icon={faAnglesLeft} className="bt" onClick={()=>nav("/addexpense")} />
      <h2 style={{color:"white"}}>Add Money</h2>

      <input type="date" className="input-field" ref={dateref} required />

      <h4>Money Title</h4>
      <input type="text" className="input-field" ref={titleref} required/>

      <h4>Amount</h4>
      <input type="number" className="input-field" min="0.00" step="0.01" ref={amountref} required/>

      
      
      
    

      <button className="add-income" type="submit">Add Money</button>
    </form>
  );
};

export default Income;
