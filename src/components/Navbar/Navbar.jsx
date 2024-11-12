import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import {
  FaShoppingCart,
  FaUserCircle,
  FaHeart,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const handleLogout = useCallback(() => {
    setUser(null);
    navigate("/");
    setDropdownOpen(false);
  }, [setUser, navigate]);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, []);

  const handleClickOutside = useCallback(
    (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.userButton}`)
      ) {
        setDropdownOpen(false);
      }
    },
    [dropdownRef]
  );

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dropdownOpen, handleClickOutside, handleScroll]);

  useEffect(() => {
    closeMenu();
  }, [location, closeMenu]);

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
      }
    },
    [navigate, searchQuery]
  );

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}
      role="navigation"
      aria-label="Principal"
    >
      <div className={styles.topNav}>
        {/* Titlul site-ului */}
        <motion.div
          className={styles.siteTitle}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/" onClick={closeMenu} className={styles.titleLink}>
            Fraga
          </Link>
        </motion.div>

        {/* Bara de căutare */}
        <div className={styles.searchBar}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Produkte suchen..."
              className={styles.searchInput}
              aria-label="Căutare produse"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <motion.button
              type="submit"
              className={styles.searchButton}
              aria-label="Caută"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaSearch />
            </motion.button>
          </form>
        </div>

        {/* Acțiuni */}
        <div className={styles.actions}>
          <Link
            to="/cart"
            className={`${styles.actionLink} ${
              isActive("/cart") ? styles.active : ""
            }`}
            aria-label="Warenkorb"
          >
            <FaShoppingCart />
            <motion.span
              className={styles.actionText}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Warenkorb ({cartItems.length})
            </motion.span>
          </Link>
          <Link
            to="/wishlist"
            className={`${styles.actionLink} ${
              isActive("/wishlist") ? styles.active : ""
            }`}
            aria-label="Wunschliste"
          >
            <FaHeart />
            <motion.span
              className={styles.actionText}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Wunschliste (0)
            </motion.span>
          </Link>

          {/* Meniul utilizatorului */}
          <div className={styles.userMenu}>
            <button
              className={styles.userButton}
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="Benutzermenü"
            >
              <FaUserCircle className={styles.userIcon} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  className={styles.userDropdown}
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  role="menu"
                  aria-label="Benutzermenü"
                >
                  {user ? (
                    <>
                      <span className={styles.greeting}>
                        Hallo, {user.name}
                      </span>
                      <button
                        onClick={handleLogout}
                        className={styles.logoutButton}
                        role="menuitem"
                      >
                        Abmelden
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className={styles.authLink}
                        role="menuitem"
                      >
                        Anmelden
                      </Link>
                      <Link
                        to="/register"
                        className={styles.authLink}
                        role="menuitem"
                      >
                        Registrieren
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Butonul pentru meniul mobil */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Schließe Menü" : "Öffne Menü"}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Meniul de navigare */}
      <AnimatePresence>
        {(mobileMenuOpen || window.innerWidth > 768) && (
          <motion.div
            className={`${styles.bottomNav} ${
              mobileMenuOpen ? styles.bottomNavActive : ""
            }`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            id="primary-navigation"
            role="menubar"
          >
            <ul className={styles.navLinks}>
              <li>
                <Link
                  to="/"
                  onClick={closeMenu}
                  className={isActive("/") ? styles.activeLink : ""}
                  role="menuitem"
                >
                  Startseite
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  onClick={closeMenu}
                  className={isActive("/products") ? styles.activeLink : ""}
                  role="menuitem"
                >
                  Produkte
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    to="/orders"
                    onClick={closeMenu}
                    className={isActive("/orders") ? styles.activeLink : ""}
                    role="menuitem"
                  >
                    Bestellungen
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/products/taschen"
                  onClick={closeMenu}
                  className={
                    isActive("/products/taschen") ? styles.activeLink : ""
                  }
                  role="menuitem"
                >
                  Taschen
                </Link>
              </li>
              <li>
                <Link
                  to="/products/handgefertigte-kleider"
                  onClick={closeMenu}
                  className={
                    isActive("/products/handgefertigte-kleider")
                      ? styles.activeLink
                      : ""
                  }
                  role="menuitem"
                >
                  Handgefertigte Kleider
                </Link>
              </li>
              <li>
                <Link
                  to="/products/pullover"
                  onClick={closeMenu}
                  className={
                    isActive("/products/pullover") ? styles.activeLink : ""
                  }
                  role="menuitem"
                >
                  Pullover
                </Link>
              </li>
              <li>
                <Link
                  to="/products/handgemacht-cardigans"
                  onClick={closeMenu}
                  className={
                    isActive("/products/handgemacht-cardigans")
                      ? styles.activeLink
                      : ""
                  }
                  role="menuitem"
                >
                  Handgemachte Cardigans
                </Link>
              </li>
              <li>
                <Link
                  to="/products/genaehte-kleider"
                  onClick={closeMenu}
                  className={
                    isActive("/products/genaehte-kleider")
                      ? styles.activeLink
                      : ""
                  }
                  role="menuitem"
                >
                  Genähte Kleider
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
