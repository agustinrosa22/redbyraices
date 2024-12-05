import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardVisitas from '../CardVisita/CardVisitas';
import style from './CardContainerVisitas.module.css';

const CardContainerVisitas = () => {
  const { id } = useParams();
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);

  useEffect(() => {
    const fetchVisitas = async () => {
      try {
        const response = await axios.get(`/visitas/property/${id}`);
        const data = response.data;

        setVisitas(data);
        calcularEstadisticas(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const calcularEstadisticas = (visitas) => {
      const inicial = {
        gusto: { yes: 0, no: 0 },
        estado: { excelente: 0, buena: 0, regular: 0, mala: 0 },
        calificacionUbicacion: { excelente: 0, buena: 0, regular: 0, mala: 0 },
        espaciosYComodidades: {
          muySatisfactorio: 0,
          satisfactorio: 0,
          insatisfactorio: 0,
        },
        calidadPrecio: { excelente: 0, buena: 0, regular: 0, mala: 0 },
        general: {
          excelente: 0,
          muyBuena: 0,
          buena: 0,
          regular: 0,
          mala: 0,
        },
        comprar: { yes: 0, no: 0 },
        verOtras: { yes: 0, no: 0, maybe: 0 },
      };

      // Procesamos cada categoría con validaciones
      const resultados = visitas.reduce((acumulador, visita) => {
        for (const key in acumulador) {
          const data = visita[key];
          if (data) {
            for (const option in acumulador[key]) {
              if (data[option]) acumulador[key][option]++;
            }
          }
        }
        return acumulador;
      }, inicial);

      // Calcular la media ponderada del "Estado"
      const totalEstado =
        resultados.estado.excelente +
        resultados.estado.buena +
        resultados.estado.regular +
        resultados.estado.mala;

      const promedioEstado =
        totalEstado > 0
          ? (resultados.estado.excelente * 100 +
              resultados.estado.buena * 75 +
              resultados.estado.regular * 50 +
              resultados.estado.mala * 0) /
            totalEstado
          : 0;

          // Calcular la media ponderada de "Calificación de Ubicación"
  const totalUbicacion =
    resultados.calificacionUbicacion.excelente +
    resultados.calificacionUbicacion.buena +
    resultados.calificacionUbicacion.regular +
    resultados.calificacionUbicacion.mala;

  const promedioUbicacion =
    totalUbicacion > 0
      ? (resultados.calificacionUbicacion.excelente * 100 +
          resultados.calificacionUbicacion.buena * 75 +
          resultados.calificacionUbicacion.regular * 50 +
          resultados.calificacionUbicacion.mala * 0) /
        totalUbicacion
      : 0;

       // Calcular la media ponderada de "Espacios y Comodidades"
  const totalEspacios =
    resultados.espaciosYComodidades.muySatisfactorio +
    resultados.espaciosYComodidades.satisfactorio +
    resultados.espaciosYComodidades.insatisfactorio;

  const promedioEspacios =
    totalEspacios > 0
      ? (resultados.espaciosYComodidades.muySatisfactorio * 100 +
          resultados.espaciosYComodidades.satisfactorio * 50 +
          resultados.espaciosYComodidades.insatisfactorio * 0) /
        totalEspacios
      : 0;

        // Calcular la media ponderada de "General"
  const totalGeneral =
    resultados.general.excelente +
    resultados.general.muyBuena +
    resultados.general.buena +
    resultados.general.regular +
    resultados.general.mala;

  const promedioGeneral =
    totalGeneral > 0
      ? (resultados.general.excelente * 100 +
          resultados.general.muyBuena * 85 +
          resultados.general.buena * 70 +
          resultados.general.regular * 50 +
          resultados.general.mala * 0) /
        totalGeneral
      : 0;

        // Calcular la media ponderada de "Calidad-Precio"
  const totalCalidadPrecio =
    resultados.calidadPrecio.excelente +
    resultados.calidadPrecio.buena +
    resultados.calidadPrecio.regular +
    resultados.calidadPrecio.mala;

  const promedioCalidadPrecio =
    totalCalidadPrecio > 0
      ? (resultados.calidadPrecio.excelente * 100 +
          resultados.calidadPrecio.buena * 75 +
          resultados.calidadPrecio.regular * 50 +
          resultados.calidadPrecio.mala * 0) /
        totalCalidadPrecio
      : 0;

        // Calcular el porcentaje de "Comprar"
  const totalComprar = resultados.comprar.yes + resultados.comprar.no;

  const promedioComprar =
    totalComprar > 0
      ? (resultados.comprar.yes * 100) / totalComprar
      : 0;

      // Calcular el porcentaje ponderado de "Ver Otras"
  const totalVerOtras =
  resultados.verOtras.yes +
  resultados.verOtras.no +
  resultados.verOtras.maybe;

const promedioVerOtras =
  totalVerOtras > 0
    ? (resultados.verOtras.yes * 100 +
        resultados.verOtras.maybe * 50 +
        resultados.verOtras.no * 0) /
      totalVerOtras
    : 0;

      // Calcular promedio general
  const promediosIndividuales = [
    promedioEstado,
    promedioUbicacion,
    promedioEspacios,
    promedioCalidadPrecio,
    promedioGeneral,
    promedioComprar,
    promedioVerOtras,
  ];

  const promedioGeneralFinal =
    promediosIndividuales.reduce((acc, curr) => acc + curr, 0) /
    promediosIndividuales.length;
      setEstadisticas({
        ...resultados,
        promedioEstado,
        promedioUbicacion,
        promedioEspacios,
        promedioCalidadPrecio,
        promedioGeneral,
        promedioComprar,
        promedioVerOtras,
        promedioGeneralFinal,
      });
    };

    if (id) {
      fetchVisitas();
    }
  }, [id]);

  return (
    <div className={style.container}>
      {loading && <p>Cargando visitas...</p>}
      {error && <p>Error: {error}</p>}
      {estadisticas && (
        <div className={style.estadisticas}>
          <h3>Estadísticas</h3>
          <div>
            <h4>¿Te gustó la propiedad?</h4>
            <p>
              Sí: {estadisticas.gusto.yes}
            </p>
            <p>
              No: {estadisticas.gusto.no} 
            </p>
            <p>
              Promedio: {((estadisticas.gusto.yes / (estadisticas.gusto.yes + estadisticas.gusto.no)) * 100)?.toFixed(2)}%
            </p>
          </div>
            <div>
            <h4>¿Cómo calificaría el estado general de la propiedad?</h4>
            <p>Excelente: {estadisticas.estado.excelente}</p>
            <p>Buena: {estadisticas.estado.buena}</p>
            <p>Regular: {estadisticas.estado.regular}</p>
            <p>Mala: {estadisticas.estado.mala}</p>
            <p>Promedio: {estadisticas.promedioEstado.toFixed(2)}%</p>
          </div>
          <div>
            <h4>¿Qué le pareció la ubicación de la propiedad?</h4>
            <p>Excelente: {estadisticas.calificacionUbicacion.excelente}</p>
            <p>Buena: {estadisticas.calificacionUbicacion.buena}</p>
            <p>Regular: {estadisticas.calificacionUbicacion.regular}</p>
            <p>Mala: {estadisticas.calificacionUbicacion.mala}</p>
            <p>Promedio: {estadisticas.promedioUbicacion.toFixed(2)}%</p>
          </div>
          <div>
            <h4>¿Qué le parecieron los espacios y comodidades de la propiedad?</h4>
            <p>Muy Satisfactorio: {estadisticas.espaciosYComodidades.muySatisfactorio}</p>
            <p>Satisfactorio: {estadisticas.espaciosYComodidades.satisfactorio}</p>
            <p>Insatisfactorio: {estadisticas.espaciosYComodidades.insatisfactorio}</p>
             <p>Promedio: {estadisticas.promedioEspacios.toFixed(2)}%</p>
          </div>
          <div>
            <h4>¿Cómo considera la relación calidad/precio de la propiedad?</h4>
            <p>Excelente: {estadisticas.calidadPrecio.excelente}</p>
            <p>Buena: {estadisticas.calidadPrecio.buena}</p>
            <p>Regular: {estadisticas.calidadPrecio.regular}</p>
            <p>Mala: {estadisticas.calidadPrecio.mala}</p>
            <p>Promedio: {estadisticas.promedioCalidadPrecio.toFixed(2)}%</p>
          </div>
          <div>
            <h4>¿Cómo calificaría el estado general de la propiedad?</h4>
            <p>Excelente: {estadisticas.general.excelente}</p>
            <p>Muy Buena: {estadisticas.general.muyBuena}</p>
            <p>Buena: {estadisticas.general.buena}</p>
            <p>Regular: {estadisticas.general.regular}</p>
            <p>Mala: {estadisticas.general.mala}</p>
            <p>Promedio: {estadisticas.promedioGeneral.toFixed(2)}%</p>
          </div>
          <div>
            <h4>¿Comprarías/Alquilarias esta propiedad?</h4>
            <p>Sí: {estadisticas.comprar.yes}</p>
            <p>No: {estadisticas.comprar.no}</p>
            <p>Porcentaje: {estadisticas.promedioComprar.toFixed(2)}%</p>
          </div>
          <div>
            <h4>¿Desea ver otras propiedades similares?</h4>
            <p>Sí: {estadisticas.verOtras.yes}</p>
            <p>No: {estadisticas.verOtras.no}</p>
            <p>Tal vez: {estadisticas.verOtras.maybe}</p>
            <p>Porcentaje Promedio: {estadisticas.promedioVerOtras.toFixed(2)}%</p>
          </div>
          <div className={style.estadisticas}>
  <h3>Estadísticas Generales</h3>
  <p>Promedio General: {estadisticas.promedioGeneralFinal.toFixed(2)}%</p>
</div>
        </div>

      )}
      {visitas && visitas.length > 0 ? (
        visitas.map((visita) => (
          <CardVisitas key={visita.id} visita={visita} />
        ))
      ) : (
        !loading && <p>No hay visitas para esta propiedad.</p>
      )}
    </div>
  );
};

export default CardContainerVisitas;
