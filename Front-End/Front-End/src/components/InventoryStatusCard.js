// InventoryStatusCard component for displaying the inventory status in a pie chart.
// It fetches inventory data (sold and unsold counts) from the server and displays it graphically.
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import './InventoryStatus.css';

const InventoryStatusCard = () => {
  // State to store inventory data (sold and unsold counts)
  const [inventoryData, setInventoryData] = useState({ sold: 0, unsold: 0 });

  //Effect hook to fetch inventory status from the server on component mount
  useEffect(() => {
    const fetchInventoryStatus = async () => {
      try {
        //Sending a GET request to the server
        const response = await fetch('http://localhost:8080/api/books/inventory-status');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parsing the response JSON
        const data = await response.json();
        // Updating the state with the fetched data
        setInventoryData(data);
      } catch (error) {
        // Logging any error during fetch
        console.error("Fetch error: " + error.message);
      }
    };
  
    fetchInventoryStatus();
  }, []);

  //Chart.js data structure for the pie chart
  const data = {
    labels: ['Sold', 'Unsold'],
    datasets: [
      {
        data: [inventoryData.sold, inventoryData.unsold],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  //Render the inventory status card with the pie chart 
  return (
    <div className="inventory-status-card">
      <h3>Inventory Status</h3>
      <div className="chart-container">
        <Pie data={data} />
      </div>
      {/*Displaying the counts of sold and unsold items */}
      <p>Sold: {inventoryData.sold} | Unsold: {inventoryData.unsold}</p>
    </div>
  );
};

export default InventoryStatusCard;
