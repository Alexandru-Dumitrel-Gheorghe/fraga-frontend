// src/pages/RegisterPage.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [registeredUser, setRegisteredUser] = useState(null); // Neue Zustand für Benutzerinformationen

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Reset error on input change
    setSuccess(""); // Reset success message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submission
    setSuccess(""); // Reset success message before submission
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      // Verwende die Antwortdaten
      setRegisteredUser(res.data.user); // Beispiel: Benutzerinformationen speichern
      setSuccess("Registrierung erfolgreich. Bitte melde dich an.");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      // Navigiere nach einer kurzen Verzögerung, um den Erfolg anzuzeigen
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Fehler bei der Registrierung:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Registrierung fehlgeschlagen. Bitte versuche es erneut.");
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2 className={styles.title}>Registrieren</h2>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        {registeredUser && (
          <p className={styles.info}>
            Willkommen, {registeredUser.name}! Du kannst dich jetzt anmelden.
          </p>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Dein Name"
            />
          </div>
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
            Registrieren
          </button>
        </form>
        <p className={styles.redirect}>
          Bereits ein Konto? <Link to="/login">Hier anmelden</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
