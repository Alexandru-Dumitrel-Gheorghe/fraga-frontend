// src/components/Testimonials/Testimonials.jsx

import React from "react";
import Slider from "react-slick";
import styles from "./Testimonials.module.css";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <section className={styles.testimonials}>
      <h2>Ce spun clienții noștri</h2>
      <div className={styles.sliderContainer}>
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
