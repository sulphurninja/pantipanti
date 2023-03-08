import React, { useState, useEffect } from 'react';
import Time from "../components/time"

export default function Header() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchTime = async () => {
      // fetch the current time from your API
      const res = await fetch('/api/stime');
      const data = await res.text();
      
      // set the time state variable
      setTime(data);
    };

    // fetch the time initially
    fetchTime();

    // update the time every minute
    const intervalId = setInterval(fetchTime, 60000);

    // cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (<div className='text-white bg-black'><h5>{time}</h5>
  <Time/></div>);
}
