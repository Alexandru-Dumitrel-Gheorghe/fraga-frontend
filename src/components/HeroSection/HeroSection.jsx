import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

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

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Willkommen bei Fraga!
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {slogan}
        </motion.p>
        <Link to="/products" className={styles.shopButton}>
          Jetzt einkaufen
        </Link>
        <motion.div
          className={styles.iconWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <FaArrowDown className={styles.icon} onClick={scrollToProducts} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
