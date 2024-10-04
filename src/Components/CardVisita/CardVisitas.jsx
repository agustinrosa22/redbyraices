// CardVisitas.jsx
import React from 'react';
import style from './CardVisitas.module.css';

const CardVisitas = ({ visita }) => {
  return (
    <div className={style.card}>
      <h3>Visitante: {visita.visitante}</h3>
      <p><strong>Agente:</strong> {visita.agente}</p>
      <p><strong>Fecha:</strong> {new Date(visita.fecha).toLocaleDateString()}</p>
      <p><strong>Descripción:</strong> {visita.descripcion}</p>
    </div>
  );
};

export default CardVisitas;
