import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import menuIcon from '../../Assets/comentario.png';

const allowedEmails = [
  'arosa@byraices.com',
  'tsanesteban@byraices.com',
  'dsanesteban@byraices.com'
];

const listButtonEmail = 'lyunes@byraices.com';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);
  const user = useSelector(state => state.user);

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
      if (userId) {
        dispatch(getUser(userId));
      }
    }
  }, [dispatch, userId]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const showApproveButton = user && user.user && user.user.mail && allowedEmails.includes(user.user.mail);
  const showListButton = user && user.user && user.user.mail === listButtonEmail;

  return (
    <div>
      {/* Botón de menú solo visible en pantallas pequeñas */}
      <button className={style.menuButton} onClick={toggleSidebar}>
        <img src={menuIcon} alt="Menu" className={style.menuIcon} />
      </button>

      {/* Sidebar */}
      <div className={`${style.sidebar} ${isExpanded ? style.expanded : ''}`}>
        <ul className={style['sidebar-menu']}>
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
          {showApproveButton && (
            <li>
              <Link to="/aprobar" className={style.link}>
                <img src={report} alt="Approve" className={style.icon} />
                Aprobar
              </Link>
            </li>
          )}
          {showListButton && (
            <li>
              <Link to="/lista" className={style.link}>
                <img src={report} alt="List" className={style.icon} />
                Lista
              </Link>
            </li>
          )}
        </ul>
        {user && user.user && (
          <div className={style['user-details']}>
            {user.user.photo && <img src={user.user.photo} alt="User Photo" />}
            <p>{user.user.name} {user.user.last_name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
