import React, { useContext } from 'react';
import { fetchdata } from './App';
import Footer from './Footer';
import './Statics.css';

const Statics = () => {
    const { transactions } = useContext(fetchdata);
    console.log(transactions);

    // Function to group transactions and sum amounts
    const generateReport = () => {
        const report = {};

        transactions.forEach(({ title, amount, money }) => {
            const normalised = title.trim().toLowerCase()
            const key = `${normalised}-${money}`; // Unique key for each title and type
            if (report[key]) {
                report[key].total += Number(amount);
               
            }else{
           
            report[key] = { title, money, total: Number(amount) }; 
            }
        });

        return Object.values(report);
    };

    const monthlyReport = generateReport();

    return (
        <>
        <div className="staticspage">
            <h2>Monthly Report</h2>
            <div className="reportcontainer">
                {monthlyReport.length > 0 ? (
                    monthlyReport.map((item, index) => (
                        <div key={index} className={item.money === 'Income' ? 'reportincome' : 'reportexpense'}>
                            <p>
                                <strong>{item.title}</strong>: ₹{item.total} ({item.money})
                            </p>
                        </div>
                    ))
                ) : (
                    <p>There are no transactions.</p>
                )}
            </div>
            
        </div>
        <Footer />
        </>
    );
};

export default Statics;
