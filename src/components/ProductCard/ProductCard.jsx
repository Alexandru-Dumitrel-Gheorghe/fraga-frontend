// src/components/ProductCard/ProductCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <Link to={`/products`} className={styles.imageLink}>
        <img
          src={product.image || "https://via.placeholder.com/150"} // Imagine fallback
          alt={product.name}
          className={styles.image}
        />
      </Link>
      <div className={styles.details}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>€{product.price.toFixed(2)}</p>
        <Link to={`/products`} className={styles.button}>
          Details ansehen
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
