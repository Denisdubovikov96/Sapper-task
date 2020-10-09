import { useState, useEffect } from "react";

export default (interval, condition) => {
  const [intervalId, setIntervalId] = useState();
  const [timer, setTimer] = useState(0);
  const timerStart = () => {
    setTimer((p) => p + 1);
  };
  useEffect(() => {
    if (condition) {
      const id = setInterval(timerStart, interval);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [condition]);
  return [timer, () => clearInterval(intervalId)];
};
