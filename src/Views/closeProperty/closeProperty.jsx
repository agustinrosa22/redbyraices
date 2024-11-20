import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editProperty } from "../../Redux/Actions/actions"; // Asegúrate de que la ruta es correcta
import { useParams } from "react-router-dom";
import axios from "axios";
import style from './closeProperty.module.css'

const CloseProperty = () => {
  const { id } = useParams(); // Obtiene el ID de la propiedad desde la URL
  const dispatch = useDispatch();

  const [propertyData, setPropertyData] = useState({
    cerrado: {
      cierre: false,
      precioCierre: "",
      currencyCierre: "",
      fecha: "",
    },
    statusProperty: true, // Por defecto, propiedad activa
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los datos actuales de la propiedad
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/property/${id}`);
        setPropertyData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener la propiedad:", err);
        setError("No se pudieron cargar los datos de la propiedad.");
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("cerrado.")) {
      const field = name.split(".")[1];
      setPropertyData((prevData) => ({
        ...prevData,
        cerrado: {
          ...prevData.cerrado,
          [field]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setPropertyData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProperty(id, propertyData));
  };

  if (loading) return <p>Cargando datos de la propiedad...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={style.container}>
    <h2 className={style.title}>Cerrar la Propiedad</h2>
    <p className={style.subtitle}>
      Una vez cerrada la propiedad dejará de figurar en las plataformas de comercialización y dejará de estar en su pantalla principal.
    </p>
    <form onSubmit={handleSubmit} className={style.form}>

      {/* Campos de cerrado */}
      <fieldset className={style.fieldset}>
        <legend className={style.legend}>Información de Cierre</legend>

        <label className={style.label}>
          Cierre Realizado:
          <input
            type="checkbox"
            name="cerrado.cierre"
            className={style.input}
            checked={propertyData.cerrado.cierre}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Precio de Cierre:
          <input
            type="text"
            name="cerrado.precioCierre"
            className={style.input}
            value={propertyData.cerrado.precioCierre || ""}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Moneda de Cierre:
          <select
            name="cerrado.currencyCierre"
            className={style.select}
            value={propertyData.cerrado.currencyCierre || ""}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>
        </label>

        <label className={style.label}>
          Fecha de Cierre:
          <input
            type="date"
            name="cerrado.fecha"
            className={style.input}
            value={propertyData.cerrado.fecha || ""}
            onChange={handleChange}
          />
        </label>
      </fieldset>

      <button type="submit" className={style.button}>
        Guardar Cambios
      </button>
    </form>
  </div>
  );
};

export default CloseProperty;
