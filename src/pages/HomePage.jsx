// src/pages/HomePage.jsx

import React from "react";
import styles from "./HomePage.module.css";
import HeroSection from "../components/HeroSection/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Categories from "../components/Categories/Categories";
import Testimonials from "../components/Testimonials/Testimonials";
import Newsletter from "../components/Newsletter/Newsletter";

const HomePage = () => {
  // Exemplu de date pentru produse
  const featuredProducts = [
    {
      id: 1,
      name: "Elegante Uhr",
      price: 199.99,
      image: "/images/products/watch.jpg",
    },
    {
      id: 2,
      name: "Moderne Tasche",
      price: 89.99,
      image: "/images/products/bag.jpg",
    },
    {
      id: 3,
      name: "Schicke Schuhe",
      price: 129.99,
      image: "/images/products/shoes.jpg",
    },
    // Alte produse...
  ];

  // Exemplu de date pentru categorii
  const categories = [
    {
      id: "accessories",
      name: "Accesorii",
      image: "/images/categories/accessories.jpg",
    },
    {
      id: "bags",
      name: "Genți",
      image: "/images/categories/bags.jpg",
    },
    {
      id: "shoes",
      name: "Încălțăminte",
      image: "/images/categories/shoes.jpg",
    },
    // Alte categorii...
  ];

  // Exemplu de date pentru testimoniale
  const testimonials = [
    {
      id: 1,
      quote: "Fraga oferă cele mai bune produse la prețuri excelente!",
      author: "Anna S.",
      image: "/images/testimonials/anna.jpg",
    },
    {
      id: 2,
      quote: "Îmi place calitatea și serviciul clienți de la Fraga.",
      author: "Max K.",
      image: "/images/testimonials/max.jpg",
    },
    {
      id: 3,
      quote: "Marca mea preferată pentru accesorii la modă.",
      author: "Laura M.",
      image: "/images/testimonials/laura.jpg",
    },
    // Alte testimoniale...
  ];

  return (
    <div className={styles.homepage}>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <Categories categories={categories} />
      <Testimonials testimonials={testimonials} />
      <Newsletter />
    </div>
  );
};

export default HomePage;
