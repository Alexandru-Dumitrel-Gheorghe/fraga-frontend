import React from "react";
import { FaRegSmileBeam, FaGlobe, FaAward } from "react-icons/fa";
import styles from "./ÜberUns.module.css";

const ÜberUns = () => {
  return (
    <section className={styles.container}>
      {/* Secțiunea Hero */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.title}>Über Uns</h2>
          <p className={styles.subtitle}>
            Wir sind leidenschaftlich dabei, dir die besten handgefertigten
            Produkte zu bieten.
          </p>
        </div>
      </div>

      {/* Secțiunea de Conținut */}
      <div className={styles.content}>
        <div className={styles.feature}>
          <FaRegSmileBeam className={styles.icon} />
          <h3 className={styles.featureTitle}>Kundenzufriedenheit</h3>
          <p>
            Deine Zufriedenheit ist unser oberstes Ziel. Wir arbeiten hart
            daran, deine Erwartungen zu übertreffen.
          </p>
        </div>
        <div className={styles.feature}>
          <FaGlobe className={styles.icon} />
          <h3 className={styles.featureTitle}>Nachhaltigkeit</h3>
          <p>
            Wir setzen uns für nachhaltige Praktiken ein, um unseren Planeten zu
            schützen.
          </p>
        </div>
        <div className={styles.feature}>
          <FaAward className={styles.icon} />
          <h3 className={styles.featureTitle}>Qualität</h3>
          <p>
            Unsere Produkte werden mit größter Sorgfalt hergestellt, um höchste
            Qualität zu garantieren.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ÜberUns;
