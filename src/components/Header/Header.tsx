import React from "react";
import logo from "../../assets/Asset-11.png";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img
        src={logo}
        alt='Логотип Экосистемы Альфа'
        className={styles.logoImage}
      />
      <h1 className={styles.logo}>Тестовое задание</h1>
    </header>
  );
};

export default Header;
