import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
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
      <h2 className={styles.cartTitle}>Warenkorb</h2>
      <div className={styles.cartList}>
        {cartItems.map((item) => (
          <div key={item._id} className={styles.cartItem}>
            <img
              src={item.image || "/images/default-product.jpg"}
              alt={item.name}
              className={styles.cartItemImage}
            />
            <div className={styles.cartItemDetails}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.cartItemPrice}>€{item.price.toFixed(2)}</p>
              <p className={styles.cartItemSize}>Größe: {item.size}</p>
              <p className={styles.cartItemQuantity}>Menge: {item.quantity}</p>
              <button
                className={styles.removeButton}
                onClick={() => removeFromCart(item._id)}
              >
                Entfernen
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cartSummary}>
        <h3 className={styles.totalPrice}>
          Gesamtpreis: €{totalPrice.toFixed(2)}
        </h3>
        <Link to="/checkout" className={styles.checkoutButton}>
          Zur Kasse gehen
        </Link>
      </div>
    </div>
  );
};

export default Cart;
