import { useState } from "react";

export default () => {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState();

  const start = () => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    setIntervalId(interval);
  };
  const stop = () => {
    clearInterval(intervalId);
    setTime(0);
  };

  return { time, start, stop };
};
