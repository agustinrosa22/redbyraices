// CardVisitas.jsx
import React from 'react';
import style from './CardVisitaAll.module.css';
import { Link } from 'react-router-dom';

const CardVisitaAll = ({ visita }) => {
  return (
    <div className={style.card}>
      <h3>Visitante: {visita.visitante}</h3>
      <p><strong>Agente:</strong> {visita.agente}</p>
      <p><strong>Fecha:</strong> {new Date(visita.fecha).toLocaleDateString()}</p>
      <p><strong>Descripción:</strong> {visita.descripcion}</p>

      <div className={style.containerButtons}>
      <Link to={`https://byraices.com/detail/${visita.propertyId}`}  target="_blank"  rel="noopener noreferrer"  className={style.detailsLink}>
      <button className={style.detailsButton}>Link de propiedad</button>
      </Link>

      <Link to={`https://redbyraices.com/historial/visitas/${visita.propertyId}`}  target="_blank"  rel="noopener noreferrer"  className={style.detailsLink}>
      <button className={style.detailsButton}>Estadistica de la propiedad</button>
      </Link>
      </div>
      
    </div>
  );
};

export default CardVisitaAll;
