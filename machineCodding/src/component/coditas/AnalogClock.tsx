// Q. Create an analog clock using React.
// Ans. Create an analog clock in React using state and CSS for styling.
// Use React's useState and useEffect hooks to manage time updates.

import { useEffect, useState } from "react";

export const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  const seconds = time.getSeconds();
  const minute = time.getMinutes();
  const hour = time.getHours();

  const secondDeg = seconds * 6;
  const minutesDeg = minute * 6 + 0.1 * seconds;
  const hourDeg = (hour % 12) * 30 + minute * 0.5;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="relative bg-white w-[400px] h-[400px] border-2 border-gray-500 rounded-full">
        <div
          className="absolute left-1/2 top-1/2 w-[4px] h-[180px] bg-black"
          style={{
            transform: `rotate(${secondDeg}deg)`,
            transformOrigin: "bottom center",
            translate: "-50% -100%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "8px",
            height: "90px",
            background: "blue",
            transform: `rotate(${minutesDeg}deg)`,
            transformOrigin: "bottom center",
            translate: "-50% -100%",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            height: "45px",
            width: "12px",
            background: "yellow",
            top: "50%",
            left: "50%",
            transformOrigin: "bottom center",
            transform: `rotate(${hourDeg}deg)`,
            translate: "-50% -100%",
          }}
        ></div>
        <div className="absolute left-1/2 top-1/2 w-[16px] h-[16px] bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
      </div>
    </div>
  );
};
