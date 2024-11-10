// src/components/Modal/Modal.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Modal.module.css"; // Importăm fișierul CSS pentru stiluri

const Modal = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleNavigateToCart = () => {
    navigate("/cart"); // Navighează la coșul de cumpărături
    onClose(); // Închide modalul
  };

  const handleNavigateToProducts = () => {
    navigate("/products"); // Navighează la pagina de produse
    onClose(); // Închide modalul
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleNavigateToCart}>
            Zum Warenkorb
          </button>
          <button className={styles.button} onClick={handleNavigateToProducts}>
            Weiter einkaufen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
