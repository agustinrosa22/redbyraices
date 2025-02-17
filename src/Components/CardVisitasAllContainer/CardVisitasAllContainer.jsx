import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardVisitaAll from '../CardVisitaAll/CardVisitaAll';
import style from './CardVisitasAllContainer.module.css';

const CardVisitasAllContainer = () => {
  const [visitas, setVisitas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitas = async () => {
      try {
        const response = await axios.get(`/visitas`);
        const data = response.data;
  
        // Agrupar visitas por fecha sin desajuste de zona horaria
        const groupedVisitas = data.reduce((acc, visita) => {
          // Dividir la fecha manualmente en partes (YYYY-MM-DD)
          const [year, month, day] = visita.fecha.split('-');
  
          // Formatear correctamente sin alterar la zona horaria
          const fechaFormateada = `${day}/${month}/${year}`;
  
          if (!acc[fechaFormateada]) acc[fechaFormateada] = [];
          acc[fechaFormateada].push(visita);
          return acc;
        }, {});
  
        setVisitas(groupedVisitas);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchVisitas();
  }, []);
  
  return (
    <div className={style.container}>
      {loading && <p>Cargando visitas...</p>}
      {error && <p>Error: {error}</p>}
      {visitas && Object.keys(visitas).length > 0 ? (
        Object.entries(visitas).map(([fecha, visitasPorFecha]) => (
          <div key={fecha} className={style.dateGroup}>
            <h1 className={style.dateHeader}>{fecha}</h1>
            <div className={style.cardContainer}>
              {Array.isArray(visitasPorFecha) ? (
                visitasPorFecha.map((visita) => (
                  <CardVisitaAll key={visita.id} visita={visita} />
                ))
              ) : (
                <p>Error: No hay visitas para esta fecha.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        !loading && <p>No hay visitas registradas.</p>
      )}
    </div>
  );
};

export default CardVisitasAllContainer;
