import React, { useContext } from 'react'
import { fetchdata } from './App'
import Footer from './Footer'
import { faTrash,faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import axios from 'axios';


const Home = () => {
    const {transactions,setTransactions,user} = useContext(fetchdata)
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

    const sumincome = ()=>{
      return transactions.filter((item)=>item.money === "Income").reduce((sum,item)=>sum + Number(item.amount),0)//reduce(accumiltor,currentvalue)=>{},inititalvalue
    }
    const sumexpense = ()=>{
      return transactions.filter((ts)=>ts.money === "expense").reduce((sum,item)=> sum + Number(item.amount),0)
    }
   const totalbalance =()=> sumincome() - sumexpense();
    
  return (
    <section id="container">
    <main>
      <h1>Expence tracker</h1>
    <div>
         <div>
         <div id="firstbox">
          <div>
            <h3>Total Balance</h3>
            <span>💰{totalbalance()}<FontAwesomeIcon icon={faIndianRupeeSign} /></span>
          </div>

          <div>
            <h3>INCOME</h3>
            <span id="expence">💵{sumincome()}
            <FontAwesomeIcon icon={faIndianRupeeSign} />
            </span>
          </div>

          <div>
            <h3>EXPENSE</h3>
            <span id="balance">💸{sumexpense()}<FontAwesomeIcon icon={faIndianRupeeSign} /> </span>
          </div>
        </div>
        
    </div>
    <div>
         <section id="transactionlist">
          {console.log(transactions,"kjbjb")}
                  <h3>Transactions</h3>
                 <div className="transactions">
                                  {transactions.length > 0 ? (
                                      transactions.map((ts, index) => (
                                          <div key={index} className="transaction-item">
                                              <div>
                                                  <p className="transaction-name">{ts.title}</p>
                                                  <p className="transaction-date">{ts.date}</p>
                                              </div>
                                              <p className={`transaction-amount ${ts.color}`}>{ts.sign}{ts.amount}</p>
                                              <button className='deletebutton'                     onClick={() => deletehandler(ts.title, ts.date, ts.amount, ts.color, ts.sign, ts.money)}
                                              ><FontAwesomeIcon icon={faTrash} /></button>
                                          </div>
                                      ))
                                  ) : (
                                      <p>No transactions added yet.</p>
                                  )}
                              </div>
               
                
                </section>
    </div>
    </div>
    </main>
    <Footer />
    </section>
    
  )
}

export default Home