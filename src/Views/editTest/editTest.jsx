import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editProperty } from '../../Redux/Actions/actions';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditTest = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    price: '',
    // Otros campos según sea necesario
  });

  // useEffect para obtener los datos de la propiedad al montar el componente
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/property/${id}`);
        const propertyDetails = response.data.data;

        setPropertyData({
          title: propertyDetails.title,
          description: propertyDetails.description,
          price: propertyDetails.price,
          // Otros campos con valores recibidos
        });
      } catch (error) {
        console.error('Error al obtener la propiedad:', error);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]); // Cambiar propertyId a id

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Añadir cada campo al FormData
    for (let key in propertyData) {
      formData.append(key, propertyData[key]);
    }

    // Enviar la acción con `id` y `formData`
    dispatch(editProperty(id, formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={propertyData.title}
        onChange={handleChange}
        placeholder="Título de la propiedad"
      />
      <textarea
        name="description"
        value={propertyData.description}
        onChange={handleChange}
        placeholder="Descripción de la propiedad"
      />
      <input
        type="number"
        name="price"
        value={propertyData.price}
        onChange={handleChange}
        placeholder="Precio"
      />
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditTest;
