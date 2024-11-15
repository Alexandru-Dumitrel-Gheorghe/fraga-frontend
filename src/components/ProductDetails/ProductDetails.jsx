import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import Modal from "../Modal/Modal";
import styles from "./ProductDetails.module.css";
import ProductCard from "../ProductCard/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);

        if (res.data && res.data.category) {
          const relatedRes = await axios.get(
            `http://localhost:5000/api/products?category=${encodeURIComponent(
              res.data.category
            )}&limit=4`
          );
          // Exclude the current product from related products
          setRelatedProducts(
            relatedRes.data.filter((item) => item._id !== res.data._id)
          );
        } else {
          setRelatedProducts([]);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className={styles.loader}>Loading...</div>;

  if (!product) return <p className={styles.error}>Produkt nicht gefunden.</p>;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, size });
    setModalMessage("Produkt erfolgreich zum Warenkorb hinzugefügt!");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.productDetails}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link> &gt; <Link to="/products">Produkte</Link> &gt;{" "}
        <span>{product.name}</span>
      </nav>

      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
          />
        </div>
        <div className={styles.infoContainer}>
          <h2 className={styles.productName}>{product.name}</h2>
          <p className={styles.productPrice}>€{product.price.toFixed(2)}</p>
          <div className={styles.productRating}>
            <span>⭐⭐⭐⭐⭐</span>
            <span className={styles.reviewCount}>
              ({product.reviews} Bewertungen)
            </span>
          </div>
          <p className={styles.productDescription}>{product.description}</p>
          <div className={styles.stock}>
            <span>
              Verfügbarkeit:{" "}
              {product.stock > 0 ? "Auf Lager" : "Nicht auf Lager"}
            </span>
          </div>

          <div className={styles.options}>
            <div className={styles.optionGroup}>
              <label htmlFor="size" className={styles.optionLabel}>
                Größe:
              </label>
              <select
                id="size"
                name="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className={styles.optionSelect}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div className={styles.optionGroup}>
              <label htmlFor="quantity" className={styles.optionLabel}>
                Menge:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className={styles.optionInput}
              />
            </div>
          </div>

          <button onClick={handleAddToCart} className={styles.addToCartButton}>
            In den Warenkorb
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className={styles.related}>
          <h3>Verwandte Produkte</h3>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
