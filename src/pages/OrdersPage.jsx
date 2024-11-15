import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import styles from "./OrdersPage.module.css";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user || !user.token) {
          console.error("Utilizatorul nu este autentificat");
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            "auth-token": user.token,
          },
        };

        const res = await axios.get("http://localhost:5000/api/orders", config);
        setOrders(res.data);
      } catch (err) {
        console.error("Eroare la obținerea comenzilor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Funcție pentru scurtarea ID-ului
  const formatOrderId = (id) => {
    if (!id) return "";
    const firstPart = id.substring(0, 8);
    const lastPart = id.substring(id.length - 4);
    return `${firstPart}...${lastPart}`;
  };

  return (
    <div className={styles.ordersContainer}>
      <h2 className={styles.title}>Meine Bestellungen</h2>
      {loading ? (
        <div className={styles.spinner}></div>
      ) : orders.length > 0 ? (
        <ul className={styles.orderList}>
          {orders.map((order) => (
            <li key={order._id} className={styles.orderItem}>
              <div className={styles.orderHeader}>
                <h3 className={styles.orderId}>
                  Bestellung #{formatOrderId(order._id)}
                </h3>
                <p className={styles.orderDate}>
                  Datum: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className={styles.orderDetails}>
                <p className={styles.orderStatus}>Status: {order.status}</p>
                <p className={styles.orderTotal}>
                  Gesamtpreis: {order.totalPrice.toFixed(2)} €
                </p>
              </div>
              <h4 className={styles.orderItemsTitle}>Artikel:</h4>
              <ul className={styles.orderItemsList}>
                {order.orderItems.map((item) => (
                  <li key={item._id} className={styles.orderProductItem}>
                    {item.product && item.product.name ? (
                      <div className={styles.productDetails}>
                        <div className={styles.productImageContainer}>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className={styles.productImage}
                          />
                        </div>
                        <div className={styles.productInfo}>
                          <Link
                            to={`/products/${item.product._id}`}
                            className={styles.productName}
                          >
                            {item.product.name}
                          </Link>
                          <p className={styles.productSize}>
                            Größe: {item.size}
                          </p>
                          <p className={styles.productQuantity}>
                            Menge: {item.quantity}
                          </p>
                          <p className={styles.productPrice}>
                            Einzelpreis: {item.product.price.toFixed(2)} €
                          </p>
                          <p className={styles.productTotalPrice}>
                            Gesamt:{" "}
                            {(item.product.price * item.quantity).toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className={styles.unavailable}>
                        Produktdaten nicht verfügbar
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noOrders}>Sie haben noch keine Bestellungen.</p>
      )}
    </div>
  );
};

export default OrdersPage;
