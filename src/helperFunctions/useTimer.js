import { useState, useEffect } from "react";

export default (handler, interval, condition) => {
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    if (condition) {
      const id = setInterval(handler, interval);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [condition]);
  return () => clearInterval(intervalId);
};
