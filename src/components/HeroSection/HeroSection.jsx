import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

const HeroSection = () => {
  const [sloganIndex, setSloganIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const slogans = [
    "Entdecken Sie die Eleganz unserer handgestrickten Kollektion.",
    "Verleihen Sie Ihrem Stil etwas Einzigartiges!",
    "Qualität und Stil in jedem Stich.",
  ];
  const images = [
    "https://images.unsplash.com/photo-1713256683892-5bab22f76be0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1700527221906-dd07b712ad16?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    const sloganInterval = setInterval(() => {
      setSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 5000); // Schimbă sloganul la fiecare 5 secunde

    const imageInterval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Schimbă imaginea la fiecare 8 secunde

    return () => {
      clearInterval(sloganInterval);
      clearInterval(imageInterval);
    };
  }, [slogans.length, images.length]);

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero}>
      {/* Slideshow de imagini */}
      <AnimatePresence>
        <motion.img
          key={imageIndex}
          src={images[imageIndex]}
          alt={`Background ${imageIndex + 1}`}
          className={styles.imageBackground}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

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
        {/* Exemplu de forme SVG */}
        <svg
          className={styles.shape}
          width="100"
          height="100"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="var(--accent-color)"
            strokeWidth="3"
            fill="none"
          />
        </svg>
        {/* Poți adăuga mai multe forme SVG sau alte elemente decorative aici */}
      </div>
    </section>
  );
};

export default HeroSection;
