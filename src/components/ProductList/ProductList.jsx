// src/components/ProductList/ProductList.js

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductList.module.css";
import { FaHeart, FaEye, FaShoppingCart, FaTimes } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { slugify } from "../../utils/slugify";

const ProductList = () => {
  const { category } = useParams(); // Retrieve category from URL parameters
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [sortOption, setSortOption] = useState("default");
  const { addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
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
    setSelectedCategory(category || "all");
  }, [category]);

  useEffect(() => {
    let updatedProducts =
      selectedCategory === "all"
        ? [...products]
        : products.filter(
            (product) => slugify(product.category) === selectedCategory
          );

    switch (sortOption) {
      case "price-asc":
        updatedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        updatedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, sortOption, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setModalProduct(product);
    setIsModalOpen(true);
    toast.success(`Produkt "${product.name}" wurde zum Warenkorb hinzugefügt!`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalProduct(null);
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
      <aside className={styles.sidebar}>
        <h3>Kategorien</h3>
        <ul className={styles.categoryList}>
          <li
            className={selectedCategory === "all" ? styles.active : ""}
            onClick={() => setSelectedCategory("all")}
          >
            Alle Kategorien
          </li>
          <li
            className={selectedCategory === "taschen" ? styles.active : ""}
            onClick={() => setSelectedCategory("taschen")}
          >
            Taschen
          </li>
          <li
            className={
              selectedCategory === "handgefertigte-kleider" ? styles.active : ""
            }
            onClick={() => setSelectedCategory("handgefertigte-kleider")}
          >
            Handgefertigte Kleider
          </li>
          <li
            className={selectedCategory === "pullover" ? styles.active : ""}
            onClick={() => setSelectedCategory("pullover")}
          >
            Pullover
          </li>
          <li
            className={
              selectedCategory === "handgemacht-cardigans" ? styles.active : ""
            }
            onClick={() => setSelectedCategory("handgemacht-cardigans")}
          >
            Handgemachte Cardigans
          </li>
          <li
            className={
              selectedCategory === "genaehte-kleider" ? styles.active : ""
            }
            onClick={() => setSelectedCategory("genaehte-kleider")}
          >
            Genähte Kleider
          </li>
        </ul>
      </aside>
      <div className={styles.mainContent}>
        <div className={styles.sorting}>
          <label htmlFor="sort">Sortieren:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Standard</option>
            <option value="price-asc">Preis: Aufsteigend</option>
            <option value="price-desc">Preis: Absteigend</option>
          </select>
        </div>

        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <div key={product._id} className={styles.productCard}>
              {product.isNew && <span className={styles.badge}>Neu</span>}
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
                loading="lazy"
              />
              <div className={styles.actions}>
                <FaHeart
                  className={styles.icon}
                  title="Zu Favoriten hinzufügen"
                  aria-label="Zu Favoriten hinzufügen"
                />
                <Link
                  to={`/product/${product._id}`}
                  className={styles.icon}
                  title="Details ansehen"
                  aria-label="Details ansehen"
                >
                  <FaEye />
                </Link>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>{product.price} €</p>
                <button
                  className={styles.addToCartButton}
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart className={styles.cartIcon} /> In den
                  Warenkorb
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && modalProduct && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              <FaTimes />
            </button>
            <h2>Erfolgreich hinzugefügt!</h2>
            <img
              src={modalProduct.image}
              alt={modalProduct.name}
              className={styles.modalImage}
            />
            <p>
              <strong>{modalProduct.name}</strong> wurde zum Warenkorb
              hinzugefügt.
            </p>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProductList;
