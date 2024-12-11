import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@components/Header/Header";
import Sidebar from "@components/Sidebar/Sidebar";
import styles from "./Layout.module.scss";

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
