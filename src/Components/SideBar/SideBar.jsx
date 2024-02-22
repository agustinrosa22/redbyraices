import { useState } from 'react';
import React from 'react';
import style from './SideBar.module.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${style.sidebar} ${isExpanded ? style.expanded : ''}`}>
      <div className={style['sidebar-toggle']} onClick={toggleSidebar}>
        {isExpanded ? '<' : '>'}
      </div>
      <ul className={style['sidebar-menu']}>
        <li>Consultas</li>
        <li>Estadísticas</li>
        <li>Clientes</li>
        <li>ACM</li>
        <li>Feed</li>
        <li>Calendario</li>
        <li>
          Busqueda
          <ul className={style['sub-menu']}>
            <li>Busqueda Activa</li>
            <li>Busqueda Avanzada</li>
            <li>Matcher</li>
          </ul>
        </li>
        <li>Herramientas y Reportes</li>
      </ul>
    </div>
  );
};

export default Sidebar;
