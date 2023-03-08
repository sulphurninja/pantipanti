import { useState, useEffect } from "react";

export default function Images() {
  const imgs = Array.from({ length: 12 }, (_, i) => `${i}.png`);

  const imageNames = [
    "chatri",
    "ball",
    "suraj",
    "panti",
    "gai",
    "bucket",
    "patang",
    "bhavrah",
    "gulab",
    "pakuli",
    "kabutar",
    "sasah",
  ];

  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const [currentMinute, setCurrentMinute] = useState(time.getMinutes());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const nextToDraw = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate(),
      time.getHours(),
      Math.floor((time.getMinutes() + 5) / 5) * 5,
      0,
      0
    );

    const drawTime = nextToDraw.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const timeToDraw = Math.floor((nextToDraw - time) / 1000);

    let intervalId;
    if (timeToDraw == 0) {
      intervalId = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % 12);
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [time, currentMinute]);

  const handleBetClick = (betId) => {
    const imgname = imageNames[betId];
    console.log(`Placing bet with image ${imgname}`);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMinute(new Date().getMinutes());
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);
  // const win = fetch(`/api/results?drawTime=${drawTime}`).then(res => res.json())
  // console.log(win)

  return (
    <div className="grid grid-rows-2 grid-cols-6 w-full h-full">
      {imgs.map((img, i) => (
        <button key={i} onClick={() => handleBetClick(i)}>
          <img
            src={`/Images/${img}`}
            className={`w-full h-full   ${
              i === index
                ? "border-white border-4 border-dashed rounded-xl"
                : "rounded-2xl border-transparent"
            } `}
            alt={img}
          />
        </button>
      ))}
    </div>
  );
}
