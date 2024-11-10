import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";
import { FaHeart, FaEye } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4);
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

  const showMoreProducts = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setVisibleProducts(4); // Resetăm numărul de produse vizibile pentru noua categorie
  };

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
      <div className={styles.categoryFilter}>
        <label>Kategorie:</label>
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="all">Alle Produkte</option>
          <option value="pullover">Pullover</option>
          <option value="taschen">Taschen</option>
          <option value="muetzen">Mützen</option>
          <option value="hosen">Hosen</option>
        </select>
      </div>
      <div className={styles.productList}>
        {filteredProducts.slice(0, visibleProducts).map((product) => (
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
              <p className={styles.categoryLabel}>{product.category}</p>
              <p className={styles.productPrice}>{product.price} €</p>
            </div>
          </div>
        ))}
      </div>
      {visibleProducts < filteredProducts.length && (
        <div className={styles.buttonContainer}>
          <button onClick={showMoreProducts} className={styles.showMoreButton}>
            Mehr Produkte anzeigen
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
