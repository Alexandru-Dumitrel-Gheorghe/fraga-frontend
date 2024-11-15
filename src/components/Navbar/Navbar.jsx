import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import {
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
  FaUser,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = useCallback(() => {
    setUser(null);
    navigate("/");
    setDropdownOpen(false);
  }, [setUser, navigate]);

  const closeMenu = useCallback(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
    setCategoryOpen(false);
    setSearchOpen(false);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location, closeMenu]);

  const isActive = (path) => location.pathname === path;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setSearchOpen(false);
    closeMenu();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.topNav}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            Fraga
          </Link>
        </div>

        {/* Navigation Links */}
        <div className={`${styles.mainNav} ${menuOpen ? styles.show : ""}`}>
          <ul className={styles.navLinks}>
            {/* Link-uri principale */}
            <li>
              <Link
                to="/"
                className={isActive("/") ? styles.activeLink : ""}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={isActive("/products") ? styles.activeLink : ""}
                onClick={closeMenu}
              >
                Produkte
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to="/orders"
                  className={isActive("/orders") ? styles.activeLink : ""}
                  onClick={closeMenu}
                >
                  Bestellungen
                </Link>
              </li>
            )}

            {/* Dropdown Categorii */}
            <li
              className={styles.dropdown}
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
            >
              <button
                className={styles.dropdownButton}
                aria-haspopup="true"
                aria-expanded={categoryOpen}
              >
                Kategorien <FaChevronDown />
              </button>
              <AnimatePresence>
                {categoryOpen && (
                  <motion.ul
                    className={styles.dropdownMenu}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <li>
                      <Link
                        to="/products/taschen"
                        className={
                          isActive("/products/taschen") ? styles.activeLink : ""
                        }
                        onClick={closeMenu}
                      >
                        Taschen
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products/handgefertigte-kleider"
                        className={
                          isActive("/products/handgefertigte-kleider")
                            ? styles.activeLink
                            : ""
                        }
                        onClick={closeMenu}
                      >
                        Handgefertigte Kleider
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products/pullover"
                        className={
                          isActive("/products/pullover")
                            ? styles.activeLink
                            : ""
                        }
                        onClick={closeMenu}
                      >
                        Pullover
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products/handgemacht-cardigans"
                        className={
                          isActive("/products/handgemacht-cardigans")
                            ? styles.activeLink
                            : ""
                        }
                        onClick={closeMenu}
                      >
                        Handgemachte Cardigans
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products/genaehte-kleider"
                        className={
                          isActive("/products/genaehte-kleider")
                            ? styles.activeLink
                            : ""
                        }
                        onClick={closeMenu}
                      >
                        Genähte Kleider
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </div>

        {/* Icons and User Dropdown Trigger */}
        <div className={styles.iconGroup}>
          {/* Buton pentru deschiderea căutării pe mobil */}

          {/* Search Form for Desktop */}
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Produkte suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Produktsuche"
            />
            <button
              type="submit"
              className={styles.searchButton}
              aria-label="Suchen"
            >
              <FaSearch />
            </button>
          </form>

          <Link to="/wishlist" aria-label="Wunschliste">
            <FaHeart className={styles.icon} />
          </Link>
          <Link to="/cart" aria-label="Warenkorb">
            <FaShoppingCart className={styles.icon} />
            {cartItems.length > 0 && (
              <span className={styles.cartCount}>{cartItems.length}</span>
            )}
          </Link>

          {/* User Icon and Dropdown */}
          <div
            className={styles.userMenu}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={styles.userButton}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="Benutzermenü"
            >
              <FaUser className={styles.userIcon} />
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
                    <button
                      onClick={handleLogout}
                      className={styles.logoutButton}
                      role="menuitem"
                    >
                      Abmelden
                    </button>
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
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Search Form for Mobile */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className={styles.mobileSearchContainer}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form
              className={styles.searchFormMobile}
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                className={styles.searchInputMobile}
                placeholder="Produkte suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Produktsuche"
              />
              <button
                type="submit"
                className={styles.searchButtonMobile}
                aria-label="Suchen"
              >
                <FaSearch />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
