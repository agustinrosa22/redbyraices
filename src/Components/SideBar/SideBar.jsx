import React, { useState, useEffect } from 'react';
import style from './SideBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../Redux/Actions/actions';
import home from '../../Assets/casa.png';
import consult from '../../Assets/charlando.png';
import statistics from '../../Assets/grafico-de-barras.png';
import client from '../../Assets/grupo.png';
import price from '../../Assets/etiqueta.png';
import feed from '../../Assets/rss-feed.png';
import calendar from '../../Assets/calendario.png';
import lupa from '../../Assets/busqueda-de-lupa.png';
import spanner from '../../Assets/llave-inglesa.png';
import report from '../../Assets/comentario.png';
import title from '../../Assets/titulo.png'

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);

  const user = useSelector(state => state.user); // Declarar la variable user y obtener los detalles del usuario del estado global

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: user,
          userId: user.id
        }
      });
    } else {
      // Si no hay información de usuario en el localStorage, intenta obtenerla del estado global
      if (userId) {
        dispatch(getUser(userId));
      }
    }
  }, [dispatch, userId]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };
  // console.log('User:', user);
  

  return (
    <div className={`${style.sidebar} ${isExpanded ? style.expanded : ''}`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
    <ul className={style['sidebar-menu']}>
      {/* <img className={style.title} src={title} alt="" /> */}
      <li>
        <img src={home} alt="Home" className={style.icon} />
        Propiedades
      </li>
      <li>
        <img src={consult} alt="Consult" className={style.icon} />
        Consultas
      </li>
      <li>
        <img src={statistics} alt="Statistics" className={style.icon} />
        Estadísticas
      </li>
      <li>
        <img src={client} alt="Client" className={style.icon} />
        Clientes
      </li>
      <li>
        <img src={price} alt="Price" className={style.icon} />
        ACM
      </li>
      <li>
        <img src={feed} alt="Feed" className={style.icon} />
        Feed
      </li>
      <li>
        <img src={calendar} alt="Calendar" className={style.icon} />
        Calendario
      </li>
      <li>
        <img src={lupa} alt="Lupa" className={style.icon} />
        Busqueda
        <ul className={style['sub-menu']}>
          <li>Busqueda Activa</li>
          <li>Busqueda Avanzada</li>
          <li>Matcher</li>
        </ul>
      </li>
      <li>
        <img src={spanner} alt="Spanner" className={style.icon} />
        Herramientas
      </li>
      <li>
        <img src={report} alt="Report" className={style.icon} />
        Reportes
      </li>
    </ul>
    {user && (
        <div className={style['user-details']}>
          <img src= {user.user.photo} alt="" />
          <p>{user.user.name}</p><p>{user.user.last_name}</p>
          {/* Mostrar otros detalles del usuario según sea necesario */}
        </div>
    )}
  </div>
);
};

export default Sidebar;
