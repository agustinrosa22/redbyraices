// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import campaign from '../../Assets/campana.png'
import refresh from '../../Assets/recargar.png'
import title from '../../Assets/titulo.png'

const NavBar = () => {
  const handleRefresh = () => {
    window.location.reload(); // Recarga la página
  };

  return (
    <div className={style.navbar}>
      <Link to="/home" className={style.title} >
      <img className={style.title} src={title} alt="" />
      </Link>
      <button className={style.notificationButton}>
        <img className={style.icon} src={campaign} alt="" />
      </button>
      <button className={style.refreshButton} onClick={handleRefresh}>
        <img className={style.icon} src={refresh} alt="" />
      </button>
      <Link to="/create" className={style.createButton}>
        CREAR NUEVA {/* Texto del botón */}
      </Link>
    </div>
  );
};

export default NavBar;
