// src/components/Header/Header.jsx

import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const slides = [
    {
      id: 1,
      title: "Willkommen bei Fraga",
      subtitle: "Entdecke die neuesten und elegantesten Produkte für dich",
      image: "/images/header-slide1.jpg",
      ctaText: "Produkte ansehen",
      ctaLink: "/products",
    },
    {
      id: 2,
      title: "Sonderangebote",
      subtitle: "Nur für kurze Zeit: Bis zu 50% Rabatt auf ausgewählte Artikel",
      image: "/images/header-slide2.jpg",
      ctaText: "Jetzt sparen",
      ctaLink: "/products?offer=true",
    },
    {
      id: 3,
      title: "Neuheiten",
      subtitle: "Sei der Erste, der unsere neuesten Kollektionen entdeckt",
      image: "/images/header-slide3.jpg",
      ctaText: "Neuheiten ansehen",
      ctaLink: "/products?new=true",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = slides.length;
  const autoPlay = true;
  const slideInterval = 5000; // 5 Sekunden
  let slideTimer;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  const startSlideTimer = () => {
    slideTimer = setInterval(nextSlide, slideInterval);
  };

  const pauseSlideTimer = () => {
    if (slideTimer) {
      clearInterval(slideTimer);
    }
  };

  useEffect(() => {
    if (autoPlay) {
      startSlideTimer();
    }
    return () => pauseSlideTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  return (
    <header className={styles.header}>
      {slides.map((slide, index) => (
        <div
          className={
            index === currentSlide
              ? `${styles.slide} ${styles.active}`
              : styles.slide
          }
          key={slide.id}
          style={{ backgroundImage: `url(${slide.image})` }}
          role="img"
          aria-label={slide.title}
        >
          <div className={styles.overlay}>
            <div className={styles.content}>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <Link to={slide.ctaLink} className={styles.ctaButton}>
                {slide.ctaText} <FaArrowRight className={styles.arrowIcon} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigationspfeile */}
      <FaArrowLeft
        className={`${styles.arrow} ${styles.left}`}
        onClick={prevSlide}
        aria-label="Zurück zur vorherigen Folie"
      />
      <FaArrowRight
        className={`${styles.arrow} ${styles.right}`}
        onClick={nextSlide}
        aria-label="Weiter zur nächsten Folie"
      />

      {/* Navigationspunkte */}
      <div className={styles.dots}>
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={
              idx === currentSlide
                ? `${styles.dot} ${styles.activeDot}`
                : styles.dot
            }
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Gehe zu Folie ${idx + 1}`}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setCurrentSlide(idx);
              }
            }}
          ></span>
        ))}
      </div>
    </header>
  );
};

export default Header;
