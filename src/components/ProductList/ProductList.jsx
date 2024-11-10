import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Stare pentru încărcare
  const [error, setError] = useState(null); // Stare pentru erori

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Fehler beim Abrufen der Produkte:", err);
        setError("Fehler beim Laden der Produkte.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.productList}>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>{product.price} €</p>
            <Link
              to={`/product/${product._id}`}
              className={styles.detailsButton}
            >
              Details
            </Link>
          </div>
        ))
      ) : (
        <p className={styles.noProducts}>Keine Produkte verfügbar.</p>
      )}
    </div>
  );
};

export default ProductList;
