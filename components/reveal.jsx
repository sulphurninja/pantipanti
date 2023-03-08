import { useState, useEffect } from "react";

export default function Reveal() {
  const [time, setTime] = useState(new Date());
  const [play1Gif, setPlay1Gif] = useState(false);
  const [play2Gif, setPlay2Gif] = useState(false);
  const [key1, setKey1] = useState(1);
  const [key2, setKey2] = useState(1);

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
      Math.floor(time.getMinutes() / 5) * 5 + 5,
      0,
      0
    );
    const timeToDraw = Math.floor((nextToDraw - time) / 1000);
    setPlay1Gif(timeToDraw > 240);
    setPlay2Gif(timeToDraw < 240);
  }, [time]);

  const toggleKey1 = () => setKey1(key1 + 1);
  const toggleKey2 = () => setKey2(key2 + 1);

  return (
    <div className="w-full h-full relative hidden">
      <div className="absolute h-full w-full">
        {play1Gif ? (
          <img
            src="1gif.gif"
            className="w-full h-full rounded-3xl"
            key={key1}
            onLoad={toggleKey1}
          />
        ) : null}
      </div>
      <div className="w-full h-full absolute">
        {play2Gif ? (
          <img
            src="2gif.gif"
            className="w-full h-full rounded-3xl"
            key={key2}
            onLoad={toggleKey2}
          />
        ) : null}
      </div>
    </div>
  );
}
