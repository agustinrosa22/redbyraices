import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import style from './VisitaForm.module.css';

const VisitaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    visitante: '',
    agente: '',
    fecha: '',
    descripcion: '',
    propertyId: '',
    gusto: { yes: false, no: false },
    calificacionUbicacion: { excelente: false, buena: false, regular: false, mala: false },
    espaciosYComodidades: { muySatisfactorio: false, satisfactorio: false, insatisfactorio: false },
    calidadPrecio: { excelente: false, buena: false, regular: false, mala: false },
    estado: { excelente: false, buena: false, regular: false, mala: false },
    general: { excelente: false, muyBuena: false, buena: false, regular: false, mala: false },
    comprar: { yes: false, no: false },
    verOtras: { yes: false, no: false, maybe: false },
  });

  useEffect(() => {
    if (id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        propertyId: id,
      }));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'date') {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Guarda la fecha tal como se introduce sin modificar
      }));
    } else if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...Object.fromEntries(Object.keys(prev[section]).map((key) => [key, false])),
          [field]: checked,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/visita', {
        ...formData,
        fecha: formData.fecha, // Se envía tal cual el usuario lo ingresó
      });
  
      console.log('Visita creada:', response.data);
      navigate(`/home`);
    } catch (error) {
      console.error('Error al crear la visita:', error);
    }
  };
  
  return (
    <div className={style.visitaFormContainer}>
      <h2 className={style.title}>Anotar Visita para la propiedad</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        {/* Información básica */}
        <div className={style.formGroup}>
          <label htmlFor="visitante" className={style.label}>Visitante:</label>
          <input
            type="text"
            id="visitante"
            name="visitante"
            className={style.input}
            value={formData.visitante}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="agente" className={style.label}>Agente:</label>
          <input
            type="text"
            id="agente"
            name="agente"
            className={style.input}
            value={formData.agente}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="fecha" className={style.label}>Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            className={style.input}
            value={formData.fecha}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="descripcion" className={style.label}>Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className={style.textarea}
            value={formData.descripcion}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Gusto */}
        <fieldset className={style.fieldset}>
          <legend>¿Te gustó la propiedad?</legend>
          <label>
            <input
              type="checkbox"
              name="gusto.yes"
              checked={formData.gusto.yes}
              onChange={handleInputChange}
            />
            Si
          </label>
          <label>
            <input
              type="checkbox"
              name="gusto.no"
              checked={formData.gusto.no}
              onChange={handleInputChange}
            />
            No
          </label>
        </fieldset>

        {/* Calificación Ubicación */}
        <fieldset className={style.fieldset}>
        <legend>¿Qué le pareció la ubicación de la propiedad?
        </legend>
        {['excelente', 'buena', 'regular', 'mala'].map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              name={`calificacionUbicacion.${option}`}
              checked={formData.calificacionUbicacion[option]}
              onChange={handleInputChange}
            />
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </label>
        ))}
      </fieldset>

      <fieldset className={style.fieldset}>
          <legend>¿Cómo calificaría el estado general de la propiedad?</legend>
          {['excelente', 'buena', 'regular', 'mala'].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name={`estado.${option}`}
                checked={formData.estado[option]}
                onChange={handleInputChange}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </fieldset>

        {/* Espacios y Comodidades */}
        <fieldset className={style.fieldset}>
  <legend>¿Qué le parecieron los espacios y comodidades de la propiedad?</legend>
  {[
    { key: 'muySatisfactorio', label: 'Muy satisfactorio' },
    { key: 'satisfactorio', label: 'Satisfactorio' },
    { key: 'insatisfactorio', label: 'Insatisfactorio' },
  ].map(({ key, label }) => (
    <label key={key}>
      <input
        type="checkbox"
        name={`espaciosYComodidades.${key}`}
        checked={formData.espaciosYComodidades[key]}
        onChange={handleInputChange}
      />
      {label}
    </label>
  ))}
</fieldset>


        {/* Calidad Precio */}
        <fieldset className={style.fieldset}>
          <legend>¿Cómo considera la relación calidad/precio de la propiedad?</legend>
          {['excelente', 'buena', 'regular', 'mala'].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name={`calidadPrecio.${option}`}
                checked={formData.calidadPrecio[option]}
                onChange={handleInputChange}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </fieldset>

        {/* General */}
        <fieldset className={style.fieldset}>
  <legend>Calificación General de la Propiedad</legend>
  {[
    { key: 'excelente', label: 'Excelente' },
    { key: 'muyBuena', label: 'Muy buena' },
    { key: 'buena', label: 'Buena' },
    { key: 'regular', label: 'Regular' },
    { key: 'mala', label: 'Mala' },
  ].map(({ key, label }) => (
    <label key={key}>
      <input
        type="checkbox"
        name={`general.${key}`}
        checked={formData.general[key]}
        onChange={handleInputChange}
      />
      {label}
    </label>
  ))}
</fieldset>

        {/* Comprar */}
        <fieldset className={style.fieldset}>
          <legend>¿Comprarías/Alquilarias esta propiedad?</legend>
          <label>
            <input
              type="checkbox"
              name="comprar.yes"
              checked={formData.comprar.yes}
              onChange={handleInputChange}
            />
            Si
          </label>
          <label>
            <input
              type="checkbox"
              name="comprar.no"
              checked={formData.comprar.no}
              onChange={handleInputChange}
            />
            No
          </label>
        </fieldset>


        <fieldset className={style.fieldset}>
          <legend>¿Desea ver otras propiedades similares?</legend>
          <label>
            <input
              type="checkbox"
              name="verOtras.yes"
              checked={formData.verOtras.yes}
              onChange={handleInputChange}
            />
            Si
          </label>
          <label>
            <input
              type="checkbox"
              name="verOtras.no"
              checked={formData.verOtras.no}
              onChange={handleInputChange}
            />
            No
          </label>
          <label>
            <input
              type="checkbox"
              name="verOtras.maybe"
              checked={formData.verOtras.maybe}
              onChange={handleInputChange}
            />
            Tal vez
          </label>
        </fieldset>

        <button type="submit" className={style.submitButton}>Crear Visita</button>
      </form>
    </div>
  );
};

export default VisitaForm;

