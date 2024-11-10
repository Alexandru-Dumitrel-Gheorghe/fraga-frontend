import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [slogan, setSlogan] = useState(
    "Entdecken Sie die Eleganz unserer handgestrickten Kollektion."
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSlogan((prevSlogan) => {
        if (
          prevSlogan ===
          "Entdecken Sie die Eleganz unserer handgestrickten Kollektion."
        ) {
          return "Verleihen Sie Ihrem Stil etwas Einzigartiges!";
        }
        return "Entdecken Sie die Eleganz unserer handgestrickten Kollektion.";
      });
    }, 5000); // Schimbă la fiecare 5 secunde
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Willkommen bei Fraga!</h1>
        <p className={styles.subtitle}>{slogan}</p>
        <div className={styles.iconWrapper}>
          <i className={`fas fa-arrow-down ${styles.icon}`}></i>{" "}
          {/* Icona pentru a indica scroll */}
        </div>
        <Link to="/products" className={styles.shopButton}>
          Jetzt einkaufen
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
