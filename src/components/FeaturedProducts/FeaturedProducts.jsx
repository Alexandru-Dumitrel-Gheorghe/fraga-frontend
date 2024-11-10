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
      id: 2,
      name: "Moderne Handtasche",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1527383214149-cb7be04ae387?q=80&w=2070&auto=format&fit=crop",
      description: "Eine elegante und moderne Tasche für jeden Anlass.",
    },
    {
      id: 3,
      name: "Bequeme Hose",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1616178193482-4dad15347c26?q=80&w=1936&auto=format&fit=crop",
      description: "Eine bequeme Hose, die Stil und Komfort vereint.",
      isNew: true,
    },
    {
      id: 4,
      name: "Warmes Strickmütze",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1457545195570-67f207084966?q=80&w=2092&auto=format&fit=crop",
      description: "Eine handgestrickte Mütze für zusätzlichen Schutz.",
    },
  ];

  return (
    <section className={styles.featured}>
      <h2 className={styles.title}>Beliebte Produkte</h2>
      <p className={styles.description}>
        Entdecken Sie unsere handgestrickten Lieblingsstücke, von Pullovern bis
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
