import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ACMLandingPage.module.css";

const ACMLandingPage = () => {
  const [hovered, setHovered] = useState(null); // Estado para detectar qué botón está activo al pasar el mouse

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Seleccione una opción</h1>

      <div className={styles.buttonContainer}>
        <Link to="/acm-inmuebles">
          <button
            className={`${styles.button} ${
              hovered === "inmuebles" ? styles.fullRed : hovered === "terrenos" ? styles.fullBlue : styles.default
            }`}
            onMouseEnter={() => setHovered("inmuebles")}
            onMouseLeave={() => setHovered(null)}
          >
            ACM Inmuebles
          </button>
        </Link>

        <Link to="/acm-terrenos">
          <button
            className={`${styles.button} ${
              hovered === "terrenos" ? styles.fullRed : hovered === "inmuebles" ? styles.fullBlue : styles.default
            }`}
            onMouseEnter={() => setHovered("terrenos")}
            onMouseLeave={() => setHovered(null)}
          >
            ACM Terrenos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ACMLandingPage;
