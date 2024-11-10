// src/components/Categories/Categories.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Categories.module.css";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Pullover",
      description: "Gemütliche Pullover für kalte Tage.",
      image:
        "https://images.unsplash.com/photo-1523251654373-00615b266166?q=80&w=2050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/pullover",
    },
    {
      id: 2,
      name: "Taschen",
      description: "Handgemachte Taschen für jeden Anlass.",
      image:
        "https://images.unsplash.com/photo-1685489814583-dfaf44dbcac8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/taschen",
    },
    {
      id: 3,
      name: "Hosen",
      description: "Stilvolle und bequeme Hosen.",
      image:
        "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/hosen",
    },
    {
      id: 4,
      name: "Mützen",
      description: "Warme und modische Mützen.",
      image:
        "https://images.unsplash.com/photo-1568196004494-b1ee34f3b436?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/muetzen",
    },
  ];

  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Kategorien</h2>
      <p className={styles.description}>
        Erkunden Sie unsere handgefertigten Kollektionen für jeden Stil und
        Anlass.
      </p>
      <div className={styles.categoryGrid}>
        {categories.map((category, index) => (
          <Link
            to={category.link}
            key={category.id}
            className={`${styles.categoryBlock} ${
              styles[`category${index % 5}`]
            }`}
          >
            <div
              className={styles.imageContainer}
              style={{ backgroundImage: `url(${category.image})` }}
            >
              <div className={styles.overlay}>
                <h3 className={styles.name}>{category.name}</h3>
                <p className={styles.categoryDescription}>
                  {category.description}
                </p>
                <span className={styles.viewProducts}>Produkte ansehen</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
