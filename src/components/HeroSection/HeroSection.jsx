// src/components/HeroSection/HeroSection.jsx

import React from "react";
import styles from "./HeroSection.module.css";
import { FaShoppingBag } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.heroContent}>
        <h1 className={styles.animateText}>Willkommen bei Fraga</h1>
        <p className={styles.animateText}>
          Entdecken Sie die neuesten Trends und handgefertigten Accessoires.
        </p>
        <a
          href="/products"
          className={`${styles.heroButton} ${styles.animateButton}`}
        >
          Jetzt kaufen <FaShoppingBag className={styles.icon} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
