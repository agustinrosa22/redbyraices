import { useState } from 'react';
import React, { useEffect } from 'react';
import style from './SideBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../Redux/Actions/actions';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);
  const user = useSelector(state => state.user); // Declarar la variable user y obtener los detalles del usuario del estado global

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId)); // Llama a la acción para obtener los detalles del usuario al cargar el componente
    }
  }, [dispatch, userId]);

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
      {user && (
        <div className={style['user-details']}>
          <h2>User Details</h2>
          <p>Name: {user.user.name}</p>
          <p>Last Name: {user.user.last_name}</p>
          {/* Mostrar otros detalles del usuario según sea necesario */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
