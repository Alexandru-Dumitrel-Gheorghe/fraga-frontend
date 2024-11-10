// src/pages/LoginPage.jsx

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Reset error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submission
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const userData = { ...res.data.user, token: res.data.token };
      setUser(userData);
      navigate("/");
    } catch (err) {
      console.error("Fehler bei der Anmeldung:", err);
      setError(
        "Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre E-Mail-Adresse und Ihr Passwort."
      );
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Anmelden</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Deine E-Mail-Adresse"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Passwort
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Dein Passwort"
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Anmelden
          </button>
        </form>
        <p className={styles.redirect}>
          Noch kein Konto? <Link to="/register">Registriere dich</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
