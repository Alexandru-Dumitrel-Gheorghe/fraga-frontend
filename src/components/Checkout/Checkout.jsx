import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Checkout.module.css";
import { FaShoppingCart } from "react-icons/fa";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      alert("Bitte melden Sie sich an, um die Bestellung abzuschließen.");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalPrice: cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        shippingInfo,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.token,
        },
      };

      await axios.post("http://localhost:5000/api/orders", orderData, config);
      clearCart();
      alert("Ihre Bestellung wurde erfolgreich aufgegeben.");
      navigate("/orders");
    } catch (err) {
      console.error("Fehler bei der Bestellung:", err);
      alert("Es gab ein Problem bei der Verarbeitung Ihrer Bestellung.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cartTotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <FaShoppingCart className={styles.emptyCartIcon} />
        <h2>Ihr Warenkorb ist leer</h2>
        <p>
          Entdecken Sie unsere{" "}
          <Link to="/products" className={styles.shopLink}>
            Produkte
          </Link>{" "}
          und füllen Sie Ihren Warenkorb.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.pageTitle}>Checkout</h2>
      <div className={styles.checkoutContent}>
        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <h3>Bestellübersicht</h3>
          <ul className={styles.cartItems}>
            {cartItems.map((item) => (
              <li key={item._id} className={styles.cartItem}>
                <div className={styles.itemDetails}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>
                      {item.quantity} x {item.price.toFixed(2)} €
                    </p>
                  </div>
                </div>
                <p className={styles.itemTotalPrice}>
                  {(item.price * item.quantity).toFixed(2)} €
                </p>
              </li>
            ))}
          </ul>
          <div className={styles.totalPrice}>
            <span>Gesamt:</span>
            <span>{cartTotalPrice.toFixed(2)} €</span>
          </div>
        </div>

        {/* Shipping Information Form */}
        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          <h3>Versandinformationen</h3>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={shippingInfo.name}
              onChange={handleChange}
              required
              placeholder="Ihr Name"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              E-Mail <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={shippingInfo.email}
              onChange={handleChange}
              required
              placeholder="Ihre E-Mail-Adresse"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Adresse <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={shippingInfo.address}
              onChange={handleChange}
              required
              placeholder="Ihre Adresse"
            />
          </div>
          <div className={styles.formGroupRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">
                Stadt <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={shippingInfo.city}
                onChange={handleChange}
                required
                placeholder="Ihre Stadt"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="postalCode">
                Postleitzahl <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleChange}
                required
                placeholder="PLZ"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="country">
              Land <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={shippingInfo.country}
              onChange={handleChange}
              required
              placeholder="Ihr Land"
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Bestellung wird verarbeitet..."
              : "Bestellung aufgeben"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
