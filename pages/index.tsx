import Head from "next/head";
import { useState, useEffect } from "react";
import Time from "../components/time";
import Winnings from "../components/winning";
import Reveal from "../components/reveal";
import Images from "../components/images";
import ResultsTable from "../components/ResultsTable";
import Amount from "../components/amount";
import { Howl } from "howler";
import React from "react";

export default function MyPage() {
  const [time, setTime] = useState(new Date());
  const wheelSound = new Howl({
    src: ["/wheel.mp3"],
  });

  const winningSound = new Howl({
    src: ["/winning.mp3"],
  });

  const timeRemainingSound = new Howl({
    src: ["/5sec.mp3"],
  });

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
    const nextToDrawTimestamp = nextToDraw.getTime();
    const timeTimestamp = time.getTime();
    const timeToDraw = Math.floor((nextToDrawTimestamp - timeTimestamp) / 1000);
    console.log(timeToDraw);
    let wheelSoundPlayed = false;
    let winningSoundPlayed = false;
    let timeRemainingSoundPlayed = false;

    function run() {
      if (timeToDraw === 0) {
        // window.location.reload();
      }
      // if (timeToDraw < 299 && !wheelSoundPlayed) {
      //   wheelSound.play();
      //   wheelSoundPlayed = true;
      // }
      if (timeToDraw == 296 && !winningSoundPlayed) {
        winningSound.play();
        winningSoundPlayed = true;
      }
      if (timeToDraw == 290){
        timeRemainingSound.stop()
      }
      if (timeToDraw == 2 && !timeRemainingSoundPlayed) {
        timeRemainingSound.play();
        timeRemainingSoundPlayed = true;
      }
    }
    run()
  }, [time]);

  return (
    <div className="">
      <Head>
        <title>Panti Pakuli</title>
      </Head>
      {/* <video 
        className="h-screen w-screen object-cover absolute"
        muted
        loop
        autoPlay
        src="/background.mp4"
      /> */}
      <div className="opacity-80 h-screen w-screen absolute"></div>
      <div className="text-white bg-black h-screen w-screen absolute">
        <section className="h-[50%] ">
          <div className="border-2 rounded-xl h-[20%] bg-slate-900">
            <Time />
          </div>
          <div className="flex justify-center items-start w-full h-[80%]">
            <div className="w-1/3 h-full border-x-4 rounded-2xl p-1 bg-slate-900">
              <ResultsTable />
              <div className="h-auto flex justify-around">
                <div className="px-2 py-1 border-2">New</div>
                <div className="px-2 py-1 border-2">Old</div>
              </div>
            </div>
            <div className="w-1/3 h-full p-4 border-y-4 rounded-3xl">
              {/* <Winnings /> */}
              <div className="h-full w-full rounded-3xl ">
                <Reveal />
              </div>
            </div>
            <div className="w-1/3 h-full rounded-3xl border-x-4 bg-slate-900 p-2 flex justify-center items-center">
              <img
                className="w-full h-full rounded-3xl "
                src="/meow.jpeg"
                alt="Cute cat"
              />
            </div>
          </div>
        </section>
        <section className="h-[40%] border-2 rounded-xl">
          <Images />
        </section>
        <section className="flex justify-center border-2 h-[10%] bg-slate-900 rounded-2xl">
          <div className="flex items-center h-full w-1/2">
            <Amount />
          </div>
        </section>
      </div>
    </div>
  );
}
