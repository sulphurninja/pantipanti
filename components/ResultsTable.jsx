import { useState, useEffect } from "react";
import axios from "axios";

function ResultsTable() {
  const [drawTimes, setDrawTimes] = useState([]);
  const [results, setResults] = useState([]);

  // Calculate the 10 previous draw times with 5-minute intervals
  const now = new Date();
  const currentMinutes = now.getMinutes();
  const nearestMultipleOfFive = Math.floor(currentMinutes / 5) * 5;
  const startDrawTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    nearestMultipleOfFive,
    0
  );
  const drawTimesArray = Array(5)
    .fill()
    .map((_, index) => {
      const drawTime = new Date(
        startDrawTime.getTime() - index * 5 * 60 * 1000
      );
      return drawTime.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          drawTimesArray.map((drawTime) =>
            axios.get(`/api/results?drawTime=${drawTime}`)
          )
        );
        const results = responses.map((response) => response.data.couponNum);
        setResults(results);
        setDrawTimes(drawTimesArray);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 60000); // Fetch data every minute

    return () => clearInterval(intervalId);
  }, [drawTimesArray]);
  

  return (
    <div className="flex first-letter">
      {drawTimesArray.map((drawTime, index) => (
        <div key={drawTime} className="border-2 rounded-2xl">
          {results[index] !== undefined && ( // Make sure the value is defined before rendering
            <img
              src={`/Images/${
                results[index] === 0 ? "0.png" : results[index] + ".png"
              }`}
              className="w-[100%] h-full rounded-2xl"
              alt={`Winning Image for ${results[index]}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ResultsTable;
