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

        // Agrupar visitas por fecha
        const groupedVisitas = data.reduce((acc, visita) => {
          // Ajustar la fecha al formato dd/mm/yyyy
          const fechaOriginal = new Date(visita.fecha); // Convertir la fecha a objeto Date
          const fechaFormateada = `${fechaOriginal.getDate().toString().padStart(2, '0')}/${
            (fechaOriginal.getMonth() + 1).toString().padStart(2, '0')
          }/${fechaOriginal.getFullYear()}`; // Formato dd/mm/yyyy

          if (!acc[fechaFormateada]) acc[fechaFormateada] = []; // Inicializar un array vacío si no existe
          acc[fechaFormateada].push(visita); // Agregar la visita al array correspondiente
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
