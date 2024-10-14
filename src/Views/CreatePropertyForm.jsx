import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProperty } from '../Redux/Actions/actions';  // Asegúrate de ajustar la ruta

const CreatePropertyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();

  // Manejador genérico para los cambios de inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejador específico para las fotos (archivos)
  const handlePhotoChange = (e) => {
    setPhotos(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('description', formData.description);

    // Añadir las fotos al FormData
    for (let i = 0; i < photos.length; i++) {
      dataToSend.append('photos', photos[i]);
    }

    // Despachar la acción de crear propiedad
    dispatch(createProperty(dataToSend));
  };
console.log(formData);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Subir Fotos:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoChange}
          required
        />
      </div>

      <button type="submit">Crear Propiedad</button>
    </form>
  );
};

export default CreatePropertyForm;
