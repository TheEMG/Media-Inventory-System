// FinancialOverviewCard component for displaying financial data in a pie chart.
// It fetches financial data from the server and displays it in a pie chart format.
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import  './FinancialOverviewCard.css';

const FinancialOverviewCard = () => {
  // State to store the financial data (COGS and profit)
  const [financialData, setFinancialData] = useState({ cogs: 0, profit: 0 });

  //Effect hook to fetch financial data from the server on component mount 
  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        //Sending a GET request to the server
        const response = await fetch('http://localhost:8080/api/books/financial-overview');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parsing the response to JSON
        const data = await response.json();
        //Updating the state with the fetched data 
        setFinancialData(data);
      } catch (error) {
        // Logging any error during fetch
        console.error("Fetch error: " + error.message);
      }
    };
  
    fetchFinancialData();
  }, []);
  
  
  //Chart.js data structure 
  const data = {
    labels: ['COGS', 'Profit'],
    datasets: [
      {
        label: 'Financial Overview',
        data: [financialData.cogs, financialData.profit],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  //Chart.js options
  const options = {
    maintainAspectRatio: false, // This will allow the chart to fill the container
    responsive: true, // This will make the chart responsive to window size changes
    // ... any other options you want to set
  };

  // Render the financial overview card with pie chart 
  return (
    <div className="financial-overview-card">
      <h3>Financial Overview</h3>
      <p>COGS: ${financialData.cogs.toFixed(2)} | Profit: ${financialData.profit.toFixed(2)}</p>
      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};


export default FinancialOverviewCard;
