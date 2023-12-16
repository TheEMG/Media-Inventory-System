// TotalInventoryCard.js
// TotalInventoryCard component for displaying the total inventory count.
// Fetches the active inventory count from the backend and displays it as a progress bar.
import React, { useState, useEffect } from 'react';
import './TotalInventory.css';

const TotalInventoryCard = () => {
  //State to store the total active inventory count 
  const [totalInventory, setTotalInventory] = useState(0);

  // Hardcoded maximum value
  const maxInventory = 1000; 


  useEffect(() => {
    // Function to fetch the active inventory count from the backend 
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/books/active-inventory-count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTotalInventory(data); // Updating state with fetched inventory count 
      } catch (error) {
        //Log any errors that occur during the fetch
        console.error('Error fetching total inventory:', error);
      }
    };

    // Call the fetchData function 
    fetchData();
  }, []);

  //Calculate the inventory useage as percentage of the maximum 
  const percentage = Math.min((totalInventory / maxInventory) * 100, 100);

  //Render the inventory card with a progress bar and text overlay 
  return (
<div className="total-inventory-card">
  <h3>Total Inventory</h3>
  <div className="inventory-progress-container">
    {/* Progress bar showing inventory usage  */}
    <div className="inventory-progress" style={{ width: `${percentage}%` }}></div>
    {/* Overlay the text on top of the progress bar */}
    <div className="total-inventory-text">{totalInventory} / {maxInventory}</div>
  </div>
</div>

  );
};


export default TotalInventoryCard;


