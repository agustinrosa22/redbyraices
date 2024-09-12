import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateSeller } from '../../Redux/Actions/actions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageSeller from '../ImageSeller/ImageSeller'; // Componente para seleccionar imágenes
import styles from './EditSellerForm.module.css';

const EditSellerForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sellers = useSelector((state) => state.sellers.data || []);
  
  const seller = sellers.find((seller) => seller.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    mail: '',
    phone_number: '',
    photo: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (seller) {
      setFormData({
        name: seller.name,
        last_name: seller.last_name,
        mail: seller.mail,
        phone_number: seller.phone_number,
        photo: seller.photo || '',
      });
    }
  }, [seller]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageSelected = (imageUrl) => {
    setFormData({
      ...formData,
      photo: imageUrl,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSeller(id, formData));
  };

  if (!seller) {
    return <p>Vendedor no encontrado.</p>;
  }

  return (
    <Form onSubmit={handleSubmit} className={styles.formContainer}>
      <FormGroup>
        <Label for="name">Nombre</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="last_name">Apellido</Label>
        <Input
          type="text"
          name="last_name"
          id="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="mail">Correo Electrónico</Label>
        <Input
          type="email"
          name="mail"
          id="mail"
          value={formData.mail}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="phone_number">Número de Teléfono</Label>
        <Input
          type="text"
          name="phone_number"
          id="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="photo">Foto</Label>
        <ImageSeller onImageSelected={handleImageSelected} currentImage={formData.photo} />
      </FormGroup>

      <Button type="submit" color="primary">
        Guardar Cambios
      </Button>
    </Form>
  );
};

export default EditSellerForm;
