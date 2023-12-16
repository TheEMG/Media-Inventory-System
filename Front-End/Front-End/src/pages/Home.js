import React from 'react';
import TotalInventoryCard from '../components/TotalInventoryCard';
import FinancialOverviewCard from '../components/FinancialOverviewCard';
import InventoryStatusCard from '../components/InventoryStatusCard';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 
import MyCalendar from '../components/MyCalendar'; 
import TodoList from '../components/TodoList';

// Home component serves as the main dashboard page of the application.
function Home() {
  const navigate = useNavigate();

  // Function to handle click event for adding a new book,
  // navigates to the books page
  const handleAddBookClick = () => {
    navigate('/books');
  };
  return (
    <div className="home-container">
      {/* Container for the 'Add Book' button */}
      <div className='temp-container'>
        <div className='button-parent'>
          <button className="add-book-button" onClick={handleAddBookClick}>
            Add Book
          </button>
        </div>

        {/* Container for various dashboard cards */}
        <div className="cards-container">
          <InventoryStatusCard />
          <FinancialOverviewCard />
          <TodoList />
        </div>
      </div>
      
      {/* Container for the calendar and total inventory card */}
      <div className="calendar-todo-container">
        <MyCalendar />
        <TotalInventoryCard />
        
      </div>
  
      
    </div>
    
  );
}  

export default Home;

