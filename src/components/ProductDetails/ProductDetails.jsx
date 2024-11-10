import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import Modal from "../Modal/Modal"; // Importă Modal
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
  const [showModal, setShowModal] = useState(false); // Stare pentru a arăta modalul
  const [modalMessage, setModalMessage] = useState(""); // Mesajul modalului

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        // Fetch related products based on category
        const relatedRes = await axios.get(
          `http://localhost:5000/api/products?category=${res.data.category}&limit=4`
        );
        setRelatedProducts(relatedRes.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className={styles.loader}></div>;

  if (!product) return <p className={styles.error}>Produkt nicht gefunden.</p>;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, size });

    // Setează mesajul și arată modalul
    setModalMessage("Produkt erfolgreich zum Warenkorb hinzugefügt!");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Închide modalul
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.infoContainer}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>€{product.price.toFixed(2)}</p>
        <div className={styles.stock}>
          <span>
            Verfügbarkeit: {product.stock > 0 ? "Auf Lager" : "Nicht auf Lager"}
          </span>
        </div>

        <div className={styles.sizeContainer}>
          <label htmlFor="size" className={styles.sizeLabel}>
            Größe:
          </label>
          <select
            id="size"
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className={styles.sizeSelect}
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div className={styles.quantityContainer}>
          <label htmlFor="quantity" className={styles.quantityLabel}>
            Menge:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={styles.quantityInput}
          />
        </div>

        <button onClick={handleAddToCart} className={styles.addToCartButton}>
          In den Warenkorb
        </button>

        <div className={styles.productRating}>
          <span>⭐⭐⭐⭐⭐</span>
          <span className={styles.reviewCount}>
            ({product.reviews} Bewertungen)
          </span>
        </div>
      </div>

      {/* Modal de adăugare în coș */}
      {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className={styles.related}>
          <h3>Verwandte Produkte</h3>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((item, index) => (
              <ProductCard key={item.id || index} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
