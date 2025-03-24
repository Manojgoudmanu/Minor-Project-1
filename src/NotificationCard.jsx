import React, { useContext } from 'react';
import './Notifications.css';
import Footer from './Footer';
import { fetchdata } from './App';

const Notifications = () => {
  const { transactions } = useContext(fetchdata);

  return (
    <>
    <h2>Notification Panel - 🔔</h2>
    <div className="notifications-panel">
      

      <div className="notification-content">
        {transactions.length > 0 ? (
          transactions.map((ele, index) => (
            <div key={index} className={`notification-item ${ele.money === "Income" ? "incomecontainer" : "expensecontainer"}`}>
              <p>
                {ele.money === "Income"
                  ? `🎉 You received ₹${ele.amount} from ${ele.title} on ${ele.date}.`
                  : `💸 You spent ₹${ele.amount} for ${ele.title} on ${ele.date}.`}
              </p>
            </div>
          ))
        ) : (
          <p className="no-notifications">📭 No new notifications.</p>
        )}
      </div>

      
    </div>
    <Footer />
    </>
  );
};

export default Notifications;
