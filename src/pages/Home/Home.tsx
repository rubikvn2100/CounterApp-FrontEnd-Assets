import React from "react";
import CounterCard from "../../components/cards/CounterCard/CounterCard";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.counterCardContainer}>
        <CounterCard />
      </div>
    </div>
  );
};

export default Home;
