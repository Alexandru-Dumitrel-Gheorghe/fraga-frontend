// src/pages/ProductsPage.jsx

import React from "react";
import { useParams } from "react-router-dom";
import HeroProductList from "../components/HeroProductList/HeroProductList";
import ProductList from "../components/ProductList/ProductList";

const ProductsPage = () => {
  const { category } = useParams(); // Obține categoria din URL

  return (
    <div>
      <HeroProductList />
      <ProductList category={category} /> {/* Transmite categoria ca prop */}
    </div>
  );
};

export default ProductsPage;
