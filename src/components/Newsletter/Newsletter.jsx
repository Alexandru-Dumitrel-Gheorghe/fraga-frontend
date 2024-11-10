// src/components/Newsletter/Newsletter.jsx

import React, { useState } from "react";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Logica pentru trimiterea email-ului (API call etc.)
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className={styles.newsletter}>
      <h2>Rămâi la curent</h2>
      {!submitted ? (
        <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Adresa ta de email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterButton}>
            Abonează-te
          </button>
        </form>
      ) : (
        <p className={styles.thankYou}>Mulțumim pentru abonare!</p>
      )}
    </section>
  );
};

export default Newsletter;
