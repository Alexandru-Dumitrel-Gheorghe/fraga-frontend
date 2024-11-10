// src/components/HeroProductList/HeroProductList.jsx

import React from "react";
import styles from "./HeroProductList.module.css";

const HeroProductList = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Entdecken Sie unsere Kollektion</h1>
        <p className={styles.description}>
          Hochwertige, handgemachte Produkte, die mit Liebe und Sorgfalt
          hergestellt wurden. Von Pullovern bis zu Taschen – hier finden Sie
          alles, was Ihr Herz begehrt.
        </p>
      </div>
    </section>
  );
};

export default HeroProductList;
