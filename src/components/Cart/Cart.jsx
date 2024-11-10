import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <p className={styles.emptyCart}>Ihr Warenkorb ist leer.</p>;
  }

  return (
    <div className={styles.cartContainer}>
      <h2>Warenkorb</h2>
      <ul className={styles.cartList}>
        {cartItems.map((item) => (
          <li key={item._id} className={styles.cartItem}>
            <img
              src={item.image || "/images/default-product.jpg"} // Fallback-Bild
              alt={item.name}
              loading="lazy"
            />
            <div className={styles.cartItemDetails}>
              <h3>{item.name}</h3>
              <p>Preis: {item.price.toFixed(2)} €</p>
              <p>Menge: {item.quantity}</p>
              <button
                className={styles.removeButton}
                onClick={() => removeFromCart(item._id)}
              >
                Entfernen
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className={styles.totalPrice}>
        Gesamtpreis: {totalPrice.toFixed(2)} €
      </h3>
      <Link to="/checkout" className={styles.checkoutButton}>
        Zur Kasse gehen
      </Link>
    </div>
  );
};

export default Cart;
