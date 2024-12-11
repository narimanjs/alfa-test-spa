import React from "react";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles.home}>
      <h2>Добро пожаловать в MyStore</h2>
      <p>Выберите категорию в меню, чтобы начать.</p>
    </div>
  );
};

export default HomePage;
