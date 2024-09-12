import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { updateSeller } from '../../Redux/Actions/actions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageSeller from '../ImageSeller/ImageSeller'; // Componente para seleccionar imágenes
import styles from './EditSellerForm.module.css';

const EditSellerForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const sellers = useSelector((state) => state.sellers.data || []);

  // Intenta obtener el vendedor del estado o de localStorage
  const localSellers = JSON.parse(localStorage.getItem('sellers')) || [];
  const seller = sellers.find((seller) => seller.id === parseInt(id)) || localSellers.find((seller) => seller.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    mail: '',
    phone_number: '',
    photo: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const generatePassword = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData({
      ...formData,
      password: password,
    });
  };

  
  // Cambiar visibilidad de la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    if (sellers.length > 0) {
      // Guardamos los vendedores en localStorage cuando se cargan desde Redux
      localStorage.setItem('sellers', JSON.stringify(sellers));
    }

    if (seller) {
      setFormData({
        name: seller.name,
        last_name: seller.last_name,
        mail: seller.mail,
        phone_number: seller.phone_number,
        photo: seller.photo || '',
        password: seller.password,
      });
    }
  }, [sellers, seller]);

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

  const handleBack = () => {
    navigate(-1); // Esto te llevará a la página anterior
  };

  if (!seller) {
    return <p>Vendedor no encontrado.</p>;
  }

  return (
    <div className={styles.editFormWrapper}>
      {/* Sección de imagen y nombre */}
      <div className={styles.sellerInfo}>
        <img src={formData.photo || '/default-profile.png'} alt="Seller" className={styles.sellerImage} />
        <h2 className={styles.sellerName}>{formData.name} {formData.last_name}</h2>
      </div>

      {/* Formulario para editar los datos del vendedor */}
      <Form onSubmit={handleSubmit} className={styles.formContainer}>
        <FormGroup>
          <Label for="name">Nombre: {formData.name}</Label>
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
          <Label for="last_name">Apellido: {formData.last_name}</Label>
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
          <Label for="mail">Correo Electrónico: {formData.mail}</Label>
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
        <Label for="password">Contraseña</Label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            type={showPassword ? 'text' : 'password'} // Cambia el tipo según el estado
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
 <div className={styles.passwordButtons}>
          <Button
            type="button"
            color="secondary"
            className={styles.toggleButton}
            style={{ marginLeft: '10px' }}
            onClick={toggleShowPassword}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'} {/* Botón para mostrar/ocultar contraseña */}
          </Button>
          <Button
            type="button"
            color="secondary"
            className={styles.generateButton}
            style={{ marginLeft: '10px' }}
            onClick={generatePassword}
          >
            Generar Contraseña {/* Botón para generar nueva contraseña */}
          </Button>
          </div>
        </div>
      </FormGroup>


        <FormGroup>
          <Label for="phone_number">Número de Teléfono: {formData.phone_number}</Label>
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

        <div className={styles.buttonGroup}>
          <Button
            type="submit"
            className={styles.customButtonPrimary}
          >
            Guardar Cambios
          </Button>
          <Button
            type="button"
            className={styles.customButtonSecondary}
            onClick={handleBack}
          >
            Volver
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditSellerForm;
