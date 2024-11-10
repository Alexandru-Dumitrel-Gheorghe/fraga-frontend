// src/pages/ProductsPage.jsx

import React from "react";
import HeroProductList from "../components/HeroProductList/HeroProductList";
import ProductList from "../components/ProductList/ProductList";

const ProductsPage = () => {
  return (
    <div>
      <HeroProductList />
      <ProductList />
    </div>
  );
};

export default ProductsPage;
