import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardVisitas from '../CardVisita/CardVisitas'; // Tu componente individual de visitas
import style from './CardContainerVisitas.module.css';

const CardContainerVisitas = () => {
  const { id } = useParams();  // Obtenemos el ID de la propiedad desde la URL
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitas = async () => {
      try {
        const response = await axios.get(`/visitas/property/${id}`);
        setVisitas(response.data);  // Asignamos las visitas obtenidas
        setLoading(false);  // Indicamos que ya no está cargando
      } catch (err) {
        setError(err.message);  // Capturamos y guardamos el error
        setLoading(false);  // Terminamos el estado de carga
      }
    };

    if (id) {
      fetchVisitas();  // Llamamos a la función para obtener las visitas
    }
  }, [id]);  // El useEffect se ejecuta cuando cambia el propertyId

  return (
    <div className={style.container}>
      {loading && <p>Cargando visitas...</p>}  {/* Indicador de carga */}
      {error && <p>Error: {error}</p>}  {/* Mostramos el error si ocurre */}
      {visitas && visitas.length > 0 ? (
        visitas.map((visita) => (
          <CardVisitas key={visita.id} visita={visita} />  // Mostramos las visitas en tarjetas
        ))
      ) : (
        !loading && <p>No hay visitas para esta propiedad.</p>  // Mensaje si no hay visitas
      )}
    </div>
  );
};

export default CardContainerVisitas;
