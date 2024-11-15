import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

const HeroSection = () => {
  const [sloganIndex, setSloganIndex] = useState(0);
  const slogans = [
    "Entdecken Sie die Eleganz unserer handgestrickten Kollektion.",
    "Verleihen Sie Ihrem Stil etwas Einzigartiges!",
    "Qualität und Stil in jedem Stich.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 5000); // Schimbă la fiecare 5 secunde
    return () => clearInterval(interval);
  }, [slogans.length]);

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero}>
      {/* Video de fundal */}
      <video
        className={styles.videoBackground}
        src="https://cdn.pixabay.com/video/2019/12/30/30703-383980330_large.mp4"
        autoPlay
        loop
        muted
      ></video>

      {/* Overlay pentru efect de întunecare */}
      <div className={styles.overlay}></div>

      {/* Conținutul principal */}
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
          Willkommen bei <span className={styles.brandName}>Fraga</span>
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          key={sloganIndex} // Asigură animația la schimbarea sloganului
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {slogans[sloganIndex]}
        </motion.p>
        <Link to="/products" className={styles.shopButton}>
          Jetzt einkaufen
        </Link>
        <motion.div
          className={styles.iconWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaArrowDown className={styles.icon} onClick={scrollToProducts} />
        </motion.div>
      </motion.div>

      {/* Elemente decorative */}
      <div className={styles.decorativeShapes}>
        {/* Exemplu de forme SVG sau alte elemente decorative */}
        <svg className={styles.shape} /* ... */></svg>
        {/* Adaugă mai multe elemente după preferință */}
      </div>
    </section>
  );
};

export default HeroSection;
