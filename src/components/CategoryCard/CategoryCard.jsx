// src/components/CategoryCard/CategoryCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ category }) => {
  return (
    <div className={styles.card}>
      <Link
        to={`/products?category=${category.id}`}
        className={styles.imageLink}
      >
        <img
          src={category.image}
          alt={category.name}
          className={styles.image}
        />
        <div className={styles.overlay}>
          <h3 className={styles.name}>{category.name}</h3>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
