// src/components/TestimonialCard/TestimonialCard.jsx

import React from "react";
import styles from "./TestimonialCard.module.css";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className={styles.card}>
      <p className={styles.quote}>"{testimonial.quote}"</p>
      <div className={styles.author}>
        <img
          src={testimonial.image}
          alt={testimonial.author}
          className={styles.authorImage}
        />
        <span>{testimonial.author}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
