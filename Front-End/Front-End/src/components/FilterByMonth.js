// FilterByMonth component for filtering data based on year and month.
// It provides input fields to select a year and a month and a button to apply the filter.
// Props:
//  - onFilter: Function to call with the selected year and month when applying the filter.
import React, { useState } from 'react';
import './FilterByMonth.css';

function FilterByMonth({ onFilter }) {
  // State the managing the selected month 
  const [year, setYear] = useState(new Date().getFullYear());

  //State for managing the selected month 
  // JavaScript months are 0-indexed
  const [month, setMonth] = useState(new Date().getMonth() + 1); 

  //Handles the filter action 
  const handleFilter = () => {
    onFilter(year, month); // Calls the onFilter prop function with the selected year and month 
  };

  //Render the filter input fields and the filter button sa
  return (
    <div className="filter-container">
    <label>
      Year:
      <input 
        type="number" 
        value={year} 
        onChange={(e) => setYear(parseInt(e.target.value, 10))} 
      />
    </label>
    <label>
      Month:
      <select value={month} onChange={(e) => setMonth(parseInt(e.target.value, 10))}>
        {/* Generate month options */}
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>
    </label>
    <button onClick={handleFilter}>Filter</button>
  </div>
  
  );
}

export default FilterByMonth;
