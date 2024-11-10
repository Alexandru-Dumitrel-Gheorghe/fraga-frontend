import React from "react";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  return (
    <section className={styles.newsletter}>
      <h2>Abonnieren Sie unseren Newsletter</h2>
      <form className={styles.form}>
        <input type="email" placeholder="Ihre E-Mail-Adresse" />
        <button type="submit">Abonnieren</button>
      </form>
    </section>
  );
};

export default Newsletter;
