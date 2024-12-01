// src/components/Footer/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Spalte: Logo und Beschreibung */}
        <div className={styles.column}>
          <h3 className={styles.logo}>Fraga</h3>
          <p>
            Fraga ist dein Online-Shop für handgefertigte Produkte, liebevoll
            und mit großer Sorgfalt hergestellt.
          </p>
        </div>

        {/* Spalte: Schnelle Links */}
        <div className={styles.column}>
          <h4>Schnelle Links</h4>
          <ul>
            <li>
              <Link to="/">Startseite</Link>
            </li>
            <li>
              <Link to="/products">Produkte</Link>
            </li>
            <li>
              <Link to="/about">Über Uns</Link>
            </li>
            <li>
              <Link to="/contact">Kontakt</Link>
            </li>
          </ul>
        </div>

        {/* Spalte: Kategorien */}
        <div className={styles.column}>
          <h4>Kategorien</h4>
          <ul>
            <li>
              <Link to="/products/taschen">Taschen</Link>
            </li>
            <li>
              <Link to="/products/handgefertigte-kleider">
                Handgefertigte Kleider
              </Link>
            </li>
            <li>
              <Link to="/products/pullover">Pullover</Link>
            </li>
            <li>
              <Link to="/products/handgemacht-cardigans">
                Handgemachte Cardigans
              </Link>
            </li>
            <li>
              <Link to="/products/genaehte-kleider">Genähte Kleider</Link>
            </li>
          </ul>
        </div>

        {/* Spalte: Kontaktinformationen */}
        <div className={styles.column}>
          <h4>Kontakt</h4>
          <p>Adresse: Musterstraße 1, 12345 Musterstadt</p>
          <p>Telefon: +49 123 456 789</p>
          <p>E-Mail: info@fraga.de</p>
          <div className={styles.socialMedia}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Untere Leiste */}
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Fraga. Alle Rechte vorbehalten.</p>
        <div className={styles.legalLinks}>
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
          <Link to="/agb">AGB</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
