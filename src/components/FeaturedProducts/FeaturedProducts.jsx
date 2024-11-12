// src/components/FeaturedProducts/FeaturedProducts.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./FeaturedProducts.module.css";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Handgestrickter Pullover",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1541629007334-1f6c44705182?q=80&w=2071&auto=format&fit=crop",
      description: "Ein warmer, handgestrickter Pullover für kalte Tage.",
      isNew: true,
    },

    {
      id: 3,
      name: "Handgefertigtes Kleid",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1632754727545-f5d44fb455de?q=80&w=1965&auto=format&fit=crop",
      description: "Elegantes Kleid für besondere Anlässe.",
      isNew: true,
    },
    {
      id: 4,
      name: "Handgemachter Cardigan",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1715176531842-7ffda4acdfa9?q=80&w=1974&auto=format&fit=crop",
      description: "Ein warmer, stilvoller Cardigan.",
    },
    {
      id: 5,
      name: "Genähtes Kleid",
      price: 99.99,
      image:
        "https://images.unsplash.com/photo-1674924066210-e6f45074b668?q=80&w=1974&auto=format&fit=crop",
      description: "Kleid aus hochwertiger Handarbeit.",
    },
  ];

  return (
    <section className={styles.featured}>
      <h2 className={styles.title}>Beliebte Produkte</h2>
      <p className={styles.description}>
        Entdecken Sie unsere handgefertigten Lieblingsstücke, von Pullovern bis
        zu Accessoires.
      </p>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            {product.isNew && <span className={styles.badge}>Neu</span>}
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.price}>€{product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/products" className={styles.shopButton}>
          Alle Produkte ansehen
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
