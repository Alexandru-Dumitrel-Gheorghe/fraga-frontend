// src/components/Navbar/Navbar.jsx

import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
    setDropdownOpen(false); // Schließe Dropdown nach dem Logout
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(false); // Schließe Dropdown beim Öffnen/Schließen des Menüs
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.closest(`.${styles.userIcon}`)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link to="/" onClick={closeMenu}>
            Fraga
          </Link>
        </div>
        <div className={styles.menuIcon} onClick={toggleMenu} aria-label="Menü">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Startseite
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={closeMenu}>
              Produkte
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/orders" onClick={closeMenu}>
                Bestellungen
              </Link>
            </li>
          )}
          <li className={styles.navItemMobile}>
            <Link to="/cart" onClick={closeMenu} className={styles.cartLink}>
              <FaShoppingCart />
              <span className={styles.cartCount}>{cartItems.length}</span>
              Warenkorb
            </Link>
          </li>
          {user ? (
            <li className={styles.navItemMobile}>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className={styles.logoutButton}
              >
                Abmelden
              </button>
            </li>
          ) : (
            <>
              <li className={styles.navItemMobile}>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={styles.authButton}
                >
                  Anmelden
                </Link>
              </li>
              <li className={styles.navItemMobile}>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className={styles.authButton}
                >
                  Registrieren
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className={styles.navActions}>
          <Link to="/cart" className={styles.cartLink}>
            <FaShoppingCart />
            <span className={styles.cartCount}>{cartItems.length}</span>
          </Link>
          {user ? (
            <div className={styles.userMenu}>
              <FaUserCircle
                className={styles.userIcon}
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-label="Benutzermenü"
              />
              {dropdownOpen && (
                <div
                  className={styles.userDropdown}
                  tabIndex="-1"
                  ref={dropdownRef}
                  role="menu"
                  aria-label="Benutzermenü"
                >
                  <span>Hallo, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className={styles.logoutButton}
                  >
                    Abmelden
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className={styles.authButton}>
                Anmelden
              </Link>
              <Link to="/register" className={styles.authButton}>
                Registrieren
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
