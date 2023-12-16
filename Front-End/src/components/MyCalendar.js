// MyCalendar component to display and interact with a calendar.
// It uses the react-calendar library for calendar functionality.
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './MyCalendar.css'; 

function MyCalendar() {
  //State to store the currently selected date 
  const [value, onChange] = useState(new Date());

  //Render the calendar with the ability to select a date 
  return (
    <div className="my-calendar-container">
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default MyCalendar;
