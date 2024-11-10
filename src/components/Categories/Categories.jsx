// src/components/Categories/Categories.jsx

import React from "react";
import styles from "./Categories.module.css";
import CategoryCard from "../CategoryCard/CategoryCard";

const Categories = () => {
  // Folosim linkuri directe către imagini găzduite online
  const categories = [
    {
      id: 1,
      name: "Bluzen",
      imageUrl:
        "https://images.unsplash.com/photo-1574886720975-4a489591a4a8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Taschen",
      imageUrl:
        "https://images.unsplash.com/photo-1574886720975-4a489591a4a8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Hosen",
      imageUrl:
        "https://images.unsplash.com/photo-1574886720975-4a489591a4a8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Unsere Kategorien</h2>
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
