import React from "react";
import styles from "./FeaturedProducts.module.css";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProducts = ({ products }) => {
  return (
    <section className={styles.featured}>
      <h2 className={styles.title}>Beliebte Produkte</h2>
      <div className={styles.productGrid}>
        {products.slice(0, 4).map((product, index) => (
          <div
            key={product.id}
            className={styles.productCardContainer}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {product.isBestseller && (
              <div className={styles.badge}>Bestseller</div>
            )}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
