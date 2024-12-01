// src/pages/HomePage.jsx

import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Categories from "../components/Categories/Categories";
import Newsletter from "../components/Newsletter/Newsletter";
import ÜberUns from "../components/ÜberUns/ÜberUns"; // Importiere die ÜberUns Komponente

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Categories />
      <ÜberUns />
      <FeaturedProducts />
      <Newsletter />
    </div>
  );
};

export default HomePage;
