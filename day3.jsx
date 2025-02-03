import React, { useEffect, useState } from "react";

const day3 = () => {
  const [loocalTimer, setLocalTimer] = useState();

  useEffect(() => {
    const setTimer = () => {
      setTimeout(() => {
        console.log("hello ");
      });
    };

    setTimer();
  }, [loocalTimer]);

  handleLocalTimerChange = () => {
    setLocalTimer((prev) => prev + 1);
  };

  return (
    <div>
      {" "}
      <button onClick={handleLocalTimerChange}> {loocalTimer} </button>
    </div>
  );
};

const day4 = () => {
  const [loocalTimer, setLocalTimer] = useState();

  useEffect(() => {
    setTimer();
  }, [loocalTimer]);

  const setTimer = () => {
    setTimeout(() => {
      console.log("hello ");
    });
  };

  handleLocalTimerChange = () => {
    setLocalTimer((prev) => prev + 1);
  };

  return (
    <div>
      {" "}
      <button onClick={handleLocalTimerChange}> {loocalTimer} </button>
    </div>
  );
};

export default day3;
