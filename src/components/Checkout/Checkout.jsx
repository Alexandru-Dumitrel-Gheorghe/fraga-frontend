import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

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
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className={styles.checkoutForm}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={shippingInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            name="address"
            id="address"
            value={shippingInfo.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">Stadt</label>
          <input
            type="text"
            name="city"
            id="city"
            value={shippingInfo.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postleitzahl</label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Land</label>
          <input
            type="text"
            name="country"
            id="country"
            value={shippingInfo.country}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Bestellung aufgeben</button>
      </form>
    </div>
  );
};

export default Checkout;
