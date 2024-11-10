// src/components/HeroSection/HeroSection.jsx

import React from "react";
import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Willkommen bei Fraga!</h1>
        <p className={styles.subtitle}>
          Entdecken Sie die Eleganz unserer handgestrickten Kollektion.
        </p>
        <Link to="/products" className={styles.shopButton}>
          Jetzt einkaufen
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
