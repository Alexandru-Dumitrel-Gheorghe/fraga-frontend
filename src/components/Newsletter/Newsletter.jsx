import React from "react";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  return (
    <section className={styles.newsletter}>
      <div className={styles.content}>
        <h2 className={styles.title}>Abonnieren Sie unseren Newsletter</h2>
        <p className={styles.description}>
          Erhalten Sie exklusive Angebote, Updates und die neuesten Produkte
          direkt in Ihren Posteingang!
        </p>
        <form className={styles.form}>
          <input
            type="email"
            placeholder="Ihre E-Mail-Adresse"
            className={styles.emailInput}
            required
          />
          <button type="submit" className={styles.subscribeButton}>
            Abonnieren
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
