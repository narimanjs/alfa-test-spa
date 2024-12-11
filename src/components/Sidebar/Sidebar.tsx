import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Главная
        </NavLink>
        <NavLink
          to='/products'
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Продукты
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
