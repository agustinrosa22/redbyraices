import React, { useState } from 'react';
import axios from 'axios';
import style from './GenerarAlquiler.module.css';

const GenerarAlquiler = () => {
  const [formData, setFormData] = useState({
    propertyId: '',
    rentValue: '',
    contractStart: '',
    contractEnd: '',
    paymentDueDate: '',
    incrementRate: '',
    documentRent: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/rental', formData);
      console.log('Contrato creado:', response.data);
      // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
    } catch (err) {
      console.error('Error al crear el alquiler:', err);
      setError('Hubo un error al intentar crear el alquiler.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Generar Alquiler</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className={style.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="propertyId">ID de Propiedad</label>
          <input
            type="text"
            name="propertyId"
            id="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="rentValue">Valor del Alquiler</label>
          <input
            type="text"
            name="rentValue"
            id="rentValue"
            value={formData.rentValue}
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="contractStart">Inicio del Contrato</label>
          <input
            type="date"
            name="contractStart"
            id="contractStart"
            value={formData.contractStart}
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="contractEnd">Fin del Contrato</label>
          <input
            type="date"
            name="contractEnd"
            id="contractEnd"
            value={formData.contractEnd}
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="paymentDueDate">Fecha de Pago</label>
          <input
            type="date"
            name="paymentDueDate"
            id="paymentDueDate"
            value={formData.paymentDueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="incrementRate">Tasa de Incremento</label>
          <input
            type="text"
            name="incrementRate"
            id="incrementRate"
            value={formData.incrementRate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="documentRent">Documento del Alquiler</label>
          <input
            type="text"
            name="documentRent"
            id="documentRent"
            value={formData.documentRent}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={style.button}>Crear Alquiler</button>
      </form>
    </div>
  );
};

export default GenerarAlquiler;
