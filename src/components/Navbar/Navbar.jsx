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
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = useCallback(() => {
    setUser(null);
    navigate("/");
    setDropdownOpen(false);
  }, [setUser, navigate]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const closeMenu = useCallback(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location, closeMenu]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.topNav}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            Fraga
          </Link>
        </div>

        {/* Primary Links (Top Navigation) */}
        <ul className={`${styles.categoryLinks}`}>
          <li>
            <Link to="/" className={isActive("/") ? styles.activeCategory : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={isActive("/products") ? styles.activeCategory : ""}
            >
              Produkte
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/orders"
                className={isActive("/orders") ? styles.activeCategory : ""}
              >
                Bestellungen
              </Link>
            </li>
          )}
        </ul>

        {/* Hamburger Menu Button */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Icons and User Button */}
        <div className={`${styles.iconGroup} ${menuOpen ? styles.show : ""}`}>
          <Link to="/wishlist" aria-label="Wunschliste">
            <FaHeart className={styles.icon} />
          </Link>
          <Link to="/cart" aria-label="Warenkorb">
            <FaShoppingCart className={styles.icon} />
            <span className={styles.cartCount}>{cartItems.length}</span>
          </Link>

          <div className={styles.userMenu}>
            <button
              className={styles.userButton}
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="Benutzermenü"
            >
              {user ? `Hallo, ${user.name}` : "Anmelden"}
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
      </div>

      {/* Main Navigation Links - only visible in mobile when menu is open */}
      <div className={`${styles.mainNav} ${menuOpen ? styles.show : ""}`}>
        <ul className={styles.navLinks}>
          {/* Primary Links (shown only in the hamburger menu on mobile) */}
          <li className={styles.mobileOnly}>
            <Link
              to="/"
              className={isActive("/") ? styles.activeLink : ""}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className={styles.mobileOnly}>
            <Link
              to="/products"
              className={isActive("/products") ? styles.activeLink : ""}
              onClick={closeMenu}
            >
              Produkte
            </Link>
          </li>
          {user && (
            <li className={styles.mobileOnly}>
              <Link
                to="/orders"
                className={isActive("/orders") ? styles.activeLink : ""}
                onClick={closeMenu}
              >
                Bestellungen
              </Link>
            </li>
          )}

          {/* Secondary Links */}
          <li>
            <Link
              to="/products/taschen"
              className={isActive("/products/taschen") ? styles.activeLink : ""}
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
                isActive("/products/pullover") ? styles.activeLink : ""
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
                isActive("/products/genaehte-kleider") ? styles.activeLink : ""
              }
              onClick={closeMenu}
            >
              Genähte Kleider
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
