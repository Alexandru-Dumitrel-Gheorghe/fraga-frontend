// src/components/Testimonial/Testimonial.jsx

import React from "react";
import styles from "./Testimonial.module.css";

const Testimonial = ({ testimonial }) => {
  return (
    <div className={styles.testimonial}>
      <p className={styles.quote}>"{testimonial.quote}"</p>
      <p className={styles.author}>- {testimonial.author}</p>
    </div>
  );
};

export default Testimonial;
