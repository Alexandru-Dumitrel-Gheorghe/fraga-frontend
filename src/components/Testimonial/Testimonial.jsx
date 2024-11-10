// src/components/Testimonials/Testimonials.jsx

import React from "react";
import styles from "./Testimonials.module.css";

const Testimonials = ({ testimonials = [] }) => {
  // Setăm un array gol ca valoare implicită
  return (
    <section className={styles.testimonials}>
      <h2>Kundenbewertungen</h2>
      {testimonials.length > 0 ? (
        testimonials.map((testimonial, index) => (
          <p key={index}>"{testimonial}" - Zufriedener Kunde</p>
        ))
      ) : (
        <p>Keine Kundenbewertungen verfügbar.</p> // Mesaj fallback dacă nu există testimoniale
      )}
    </section>
  );
};

export default Testimonials;
