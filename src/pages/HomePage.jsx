// src/pages/HomePage.jsx

import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Categories from "../components/Categories/Categories";
import Newsletter from "../components/Newsletter/Newsletter";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </div>
  );
};

export default HomePage;
