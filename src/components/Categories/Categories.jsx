// src/components/Categories/Categories.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Categories.module.css";

const Categories = () => {
  const categories = [
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
      name: "Handgefertigte Kleider",
      description: "Elegante Kleider für besondere Anlässe.",
      image:
        "https://images.unsplash.com/photo-1632754727545-f5d44fb455de?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/handgefertigte-kleider",
    },
    {
      id: 4,
      name: "Pullover Handgemacht",
      description: "Handgemachte Pullover für Komfort und Stil.",
      image:
        "https://images.unsplash.com/photo-1597954222037-77adcb50f9a4?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/pullover",
    },
    {
      id: 5,
      name: "Cardigans Handgemacht",
      description: "Warme und stilvolle handgefertigte Cardigans.",
      image:
        "https://images.unsplash.com/photo-1715176531842-7ffda4acdfa9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/handgemacht-cardigans",
    },
    {
      id: 6,
      name: "Genähte Kleider",
      description: "Kleider aus hochwertiger Handarbeit.",
      image:
        "https://images.unsplash.com/photo-1674924066210-e6f45074b668?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/products/genaehte-kleider",
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
            aria-label={`Produkte ansehen für ${category.name}`}
          >
            <div
              className={styles.imageContainer}
              style={{ backgroundImage: `url(${category.image})` }}
              role="img"
              aria-label={category.name}
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
