import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";
import { FaHeart, FaEye } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        setFilteredProducts(res.data); // Inițial, toate produsele sunt afișate
      } catch (err) {
        console.error("Fehler beim Abrufen der Produkte:", err);
        setError("Fehler beim Laden der Produkte.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

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
    <div className={styles.productContainer}>
      <aside className={styles.sidebar}>
        <h3>Alle Produkte</h3>
        <ul className={styles.categoryList}>
          <li onClick={() => setSelectedCategory("all")}>Alle Produkte</li>
          <li onClick={() => setSelectedCategory("pullover")}>Pullover</li>
          <li onClick={() => setSelectedCategory("taschen")}>Taschen</li>
          <li onClick={() => setSelectedCategory("muetzen")}>Mützen</li>
          <li onClick={() => setSelectedCategory("hosen")}>Hosen</li>
        </ul>
      </aside>
      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <div key={product._id} className={styles.productCard}>
            {product.isNew && <span className={styles.badge}>Neu</span>}
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.overlay}>
              <div className={styles.actions}>
                <FaHeart className={styles.icon} />
                <Link to={`/product/${product._id}`} className={styles.icon}>
                  <FaEye />
                </Link>
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>{product.price} €</p>
              <div className={styles.colorOptions}>
                <span
                  className={styles.colorDot}
                  style={{ backgroundColor: "blue" }}
                ></span>
                <span
                  className={styles.colorDot}
                  style={{ backgroundColor: "black" }}
                ></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
