import React, { useEffect, useMemo, useState } from "react";

import { CounterProps } from "./Counter.types";

const Counter: React.FC<CounterProps> = ({
  total,
  onCounterChange = () => {},
  onCounterFinish = () => {},
}) => {
  const [count, setCount] = useState(total);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 0) {
          clearInterval(prev);

          return prev;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [total]);

  useEffect(() => {
    if (count > 0 && count < total) {
      onCounterChange(count);
    }

    if (count === 0) {
      onCounterFinish();
    }
  }, [count, total, onCounterChange, onCounterFinish]);

  // Format time for display
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }, [count]);

  return <div className="p-4 text-8xl font-bold">{formattedTime}</div>;
};

export default Counter;
