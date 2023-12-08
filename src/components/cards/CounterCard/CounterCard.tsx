import React from "react";
import {
  CounterSessionProvider,
  useCounterSession,
} from "../../../contexts/CounterSessionContextProvider";
import styles from "./CounterCard.module.css";

export const CounterCardContent: React.FC = () => {
  const { counter, sessionStatus, addTimestamp, setReconnect } =
    useCounterSession();

  const renderControlButton = () => {
    switch (sessionStatus) {
      case "Connecting":
        return <div className={styles.incrementButton}>{sessionStatus}</div>;

      case "Live":
        return (
          <div
            onClick={() => {
              addTimestamp();
            }}
            className={styles.incrementButton}
          >
            Increment
          </div>
        );

      case "Stopped":
        return (
          <div
            onClick={() => {
              setReconnect();
            }}
            className={styles.incrementButton}
          >
            Reconnect
          </div>
        );

      default:
        console.error("Unknown session status:", sessionStatus);
        return null;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.counterDisplay}>Counter: {counter}</div>
      {renderControlButton()}
    </div>
  );
};

const CounterCard: React.FC = () => {
  return (
    <CounterSessionProvider>
      <CounterCardContent />
    </CounterSessionProvider>
  );
};

export default CounterCard;
