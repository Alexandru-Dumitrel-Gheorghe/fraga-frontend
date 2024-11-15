import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeroProductList.module.css";
import { motion } from "framer-motion";

const HeroProductList = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className={styles.hero}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={styles.overlay}></div>
      <motion.div className={styles.content} variants={itemVariants}>
        <motion.h1 className={styles.title} variants={itemVariants}>
          Entdecken Sie unsere Kollektion
        </motion.h1>
        <motion.p className={styles.description} variants={itemVariants}>
          Hochwertige, handgemachte Produkte, die mit Liebe und Sorgfalt
          hergestellt wurden. Von Pullovern bis zu Taschen – hier finden Sie
          alles, was Ihr Herz begehrt.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link to="/products" className={styles.ctaButton}>
            Jetzt Entdecken
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroProductList;
