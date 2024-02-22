// NavBar.jsx
import React from 'react';
import style from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={style.navbar}>
      <button className={style.notificationButton}>
        <span className={style.icon}>🔔</span> {/* Icono de campana */}
      </button>
      <button className={style.refreshButton}>
        <span className={style.icon}>🔄</span> {/* Icono de refresh */}
      </button>
      <button className={style.createButton}>
        CREAR NUEVA {/* Texto del botón */}
      </button>
    </div>
  );
};

export default NavBar;
