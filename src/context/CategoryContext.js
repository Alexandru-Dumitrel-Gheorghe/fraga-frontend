import React, { createContext, useState, useEffect } from "react";

// Creează contextul
export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categoriile dintr-un API sau definește-le static
  useEffect(() => {
    // Exemplu cu categorii statice
    const fetchCategories = async () => {
      // Înlocuiește acest array cu un apel către API-ul tău dacă este cazul
      const data = [
        { id: 1, name: "Taschen", slug: "taschen" },
        {
          id: 2,
          name: "Handgefertigte Kleider",
          slug: "handgefertigte-kleider",
        },
        { id: 3, name: "Pullover", slug: "pullover" },
        {
          id: 4,
          name: "Handgemachte Cardigans",
          slug: "handgemacht-cardigans",
        },
        { id: 5, name: "Genähte Kleider", slug: "genaehte-kleider" },
      ];
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};
