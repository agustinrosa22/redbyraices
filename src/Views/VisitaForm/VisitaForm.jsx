import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import style from './VisitaForm.module.css';

const VisitaForm = () => {
  const { id } = useParams();  // Obtener el propertyId de los parámetros de la URL
  const navigate = useNavigate();  // useNavigate hook

  const [formData, setFormData] = useState({
    visitante: '',
    agente: '',
    fecha: '',
    descripcion: '',
    propertyId: '',  // Campo para propertyId
  });

  // Usar useEffect para cargar el propertyId en el formData cuando el componente se monte
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      propertyId: id  // Asignar el id de los parámetros a propertyId
    }));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newVisita = {
        ...formData,
        propertyId: id  // Asegurar que el propertyId se envía correctamente
      };

      // Enviar los datos de la visita al backend
      const response = await axios.post('/visita', newVisita);

      // Manejar el éxito
      console.log('Visita creada:', response.data);
      navigate(`/home`);  // Redireccionar a la página de inicio o donde desees

    } catch (error) {
      console.error('Error al crear la visita:', error);
    }
  };

  return (
    <div className={style.visitaFormContainer}>
      <h2 className={style.title}>Anotar Visita para la propiedad</h2>
      <form onSubmit={handleSubmit} className={style.form}>
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
            className={style.fecha}
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
            required
          ></textarea>
        </div>

        <button type="submit" className={style.submitButton}>Crear Visita</button>
      </form>
    </div>
  );
};

export default VisitaForm;
