import React, { useState } from "react";
import styles from "./CounterCard.module.css";

const CounterCard: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles.card}>
      <div className={styles.counterDisplay}>Counter: {count}</div>
      <div onClick={increment} className={styles.incrementButton}>
        Increment
      </div>
    </div>
  );
};

export default CounterCard;
