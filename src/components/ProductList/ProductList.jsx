import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./ProductList.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";

// Slugify function
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .trim();
};

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Relevanz");
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // States for loading and error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // States for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  // Fetch products on initialization
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);

        // Extract unique categories
        const uniqueCategories = [
          "Alle",
          ...new Set(res.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Fehler beim Abrufen der Produkte:", err);
        setError(
          "Es gab ein Problem beim Laden der Produkte. Bitte versuche es später erneut."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Synchronize selectedCategory with URL parameter
  useEffect(() => {
    if (category) {
      // Find the matching category from the list
      const matchingCategory = categories.find(
        (cat) => slugify(cat) === category.toLowerCase()
      );
      setSelectedCategory(matchingCategory || "Alle");
    } else {
      setSelectedCategory("Alle");
    }
  }, [category, categories]);

  // Filter and sort function
  const filterAndSortProducts = useCallback(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "Alle") {
      filtered = filtered.filter(
        (product) => slugify(product.category) === slugify(selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortOption) {
      case "Preis: Niedrig zu Hoch":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Preis: Hoch zu Niedrig":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Name: A-Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name: Z-A":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setDisplayedProducts(filtered);
  }, [products, selectedCategory, searchQuery, sortOption]);

  // Apply filter and sort when dependencies change
  useEffect(() => {
    filterAndSortProducts();
    setCurrentPage(0); // Reset to the first page when changes occur
  }, [filterAndSortProducts]);

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    setSelectedCategory(selectedCat);
    if (selectedCat === "Alle") {
      navigate("/products");
    } else {
      navigate(`/products/${slugify(selectedCat)}`);
    }
  };

  // Handle search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle adding to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} wurde zum Warenkorb hinzugefügt!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Handle page clicks
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate products for the current page
  const offset = currentPage * itemsPerPage;
  const currentPageData = displayedProducts.slice(
    offset,
    offset + itemsPerPage
  );
  const pageCount = Math.ceil(displayedProducts.length / itemsPerPage);

  return (
    <div className={styles.productContainer}>
      <ToastContainer />
      <div className={styles.toolbar}>
        <select
          className={styles.categorySelect}
          value={selectedCategory}
          onChange={handleCategoryChange}
          aria-label="Kategorie auswählen"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          className={styles.searchInput}
          placeholder="Produkte suchen..."
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Produkte suchen"
        />

        <select
          className={styles.sortSelect}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          aria-label="Produkte sortieren"
        >
          <option>Relevanz</option>
          <option>Preis: Niedrig zu Hoch</option>
          <option>Preis: Hoch zu Niedrig</option>
          <option>Name: A-Z</option>
          <option>Name: Z-A</option>
        </select>
      </div>

      {isLoading ? (
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
          <p>Produkte werden geladen...</p>
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : (
        <>
          <div className={styles.productGrid}>
            {currentPageData.length > 0 ? (
              currentPageData.map((product) => (
                <div key={product._id} className={styles.productCard}>
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                      loading="lazy"
                    />
                  </Link>
                  <div className={styles.cardContent}>
                    <Link to={`/product/${product._id}`}>
                      <h3 className={styles.productName}>{product.name}</h3>
                    </Link>
                    <p className={styles.productPrice}>{product.price} €</p>
                    <button
                      className={styles.addToCartButton}
                      onClick={() => handleAddToCart(product)}
                      aria-label="Zum Warenkorb hinzufügen"
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>Keine Produkte gefunden.</div>
            )}
          </div>

          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={styles.pagination}
              pageClassName={styles.pageItem}
              pageLinkClassName={styles.pageLink}
              previousClassName={styles.pageItem}
              previousLinkClassName={styles.pageLink}
              nextClassName={styles.pageItem}
              nextLinkClassName={styles.pageLink}
              breakClassName={styles.pageItem}
              breakLinkClassName={styles.pageLink}
              activeClassName={styles.active}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
