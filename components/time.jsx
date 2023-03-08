import { useState, useEffect } from "react";
import React from "react";
import moment from 'moment-timezone';

export default function Time() {
  const [time, setTime] = useState(moment().tz("Asia/Kolkata"));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment().tz("Asia/Kolkata"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextToDraw = moment().tz("Asia/Kolkata").add(5 - (moment().tz("Asia/Kolkata").minute() % 5), 'minutes').seconds(0);
  function run() {
    window.location.reload();
  }

  const timeDiff = Math.floor((nextToDraw - time) / 1000);
  const minutes = Math.floor(timeDiff / 60);
  const seconds = timeDiff % 60;
  const timeToDraw = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  const nextToDrawtime = nextToDraw.format("hh:mm A");

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center h-full ">
        <p className="border-r-2 rounded-3xl h-full w-1/5 bg-black flex justify-around items-center text-3xl">
          Time- {time.format("hh:mm:ss A")}
        </p>
        <p className="border-r-2 rounded-full h-full w-1/5 bg-black border-l-2 flex justify-around items-center text-5xl">
          {timeToDraw}
        </p>
        <button className="h-auto w-fit text-5xl flex justify-center  bg-black text-white border-x-2 rounded-3xl" onClick={() => run()}>
        ↻
        </button>
        <p className="border-l-2 rounded-3xl h-full w-1/5 bg-black flex justify-around items-center text-3xl">
          Draw @ {nextToDrawtime}
        </p>

        
      </div>
    </div>
  );
}
