import React, { useState, useEffect } from 'react';
//Clock component to display the current time
//It updates every second to show the current time 
function Clock() {
  // State to store the current time 
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Effect to set up an interval for updating the time every second
    const timerId = setInterval(() => setTime(new Date()), 1000);

    //Clean up function to clear the interval when the component unmounts
    return () => {
      clearInterval(timerId);
    };
  }, []); //Empty dependency array means this effect runs once on mount 

  // Render the current time 
  return (
    <div>
      {time.toLocaleTimeString()}
    </div>
  );
}

export default Clock;
