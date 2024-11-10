// src/components/Breadcrumb/Breadcrumb.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className={styles.breadcrumb}>
      <Link to="/">Home</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span key={to}>{decodeURIComponent(value)}</span>
        ) : (
          <Link key={to} to={to}>
            {decodeURIComponent(value)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
