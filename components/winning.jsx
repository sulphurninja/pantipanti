import { useState, useEffect } from "react";
import axios from "axios";

function Winnings() {
  const [drawTime, setDrawTime] = useState("");
  const [result, setResult] = useState("");

  // Calculate the current draw time with 5-minute intervals
  const now = new Date();
  const currentMinutes = now.getMinutes();
  const nearestMultipleOfFive = Math.floor(currentMinutes / 5) * 5;
  const currentDrawTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    nearestMultipleOfFive,
    0
  ).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Delay for 1 second
      try {
        const response = await axios.get(`/api/results?drawTime=${currentDrawTime}`);
        const result = response.data.couponNum;
        if (result !== undefined) {
          setResult(result);
          setDrawTime(currentDrawTime);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();x
  }, [currentDrawTime]);

  return (
    <div className="h-full relative">
      {result !== undefined && (
        <div className="w-full h-full object-cover ">
          <img
            className="h-full w-full absolute"
            src={`/Images/${result === 0 ? "0.png" : result + ".png"}`}
            alt={`Winning Image for ${result}`}
          />
          <p className="w-full h-full rounded absolute">
            <img src="11.gif" className="w-full h-full"/>
          </p>
        </div>
      )}
    </div>
  );
}

export default Winnings;
