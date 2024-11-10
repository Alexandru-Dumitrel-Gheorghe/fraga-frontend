// src/components/ProductDetails/ProductDetails.jsx

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import styles from "./ProductDetails.module.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import ProductCard from "../ProductCard/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

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
    addToCart({ ...product, quantity });
  };

  return (
    <div className={styles.productDetails}>
      <Breadcrumb />
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
      </div>

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
