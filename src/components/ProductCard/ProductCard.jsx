import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img
          src={product.image || "/images/default-product.jpg"} // Fallback-Bild
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
      </Link>
      <div className={styles.details}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>€{product.price.toFixed(2)}</p>
        <Link to={`/product/${product.id}`} className={styles.button}>
          Details ansehen
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
