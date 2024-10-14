import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Asegúrate de haber instalado axios o puedes usar fetch
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageSeller from '../ImageSeller/ImageSeller';
import styles from './EditSellerForm.module.css';

const EditSellerForm = () => {
  const { id } = useParams();  // Obtener el ID de los parámetros de la URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    mail: '',
    phone_number: '',
    photo: '',
    password: '',
    status: true,
    martillerId: '',
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // useEffect para cargar los datos del vendedor
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(`/seller/${id}`);
        const seller = response.data.data;
        setFormData({
          name: seller.name,
          last_name: seller.last_name,
          mail: seller.mail,
          phone_number: seller.phone_number,
          password: seller.password,
          status: seller.status,
          martillerId: seller.martillerId,
        });
        setSelectedImage(seller.photo || ''); // Establecer la imagen actual si existe
        setLoading(false);
      } catch (error) {
        console.error('Error fetching seller details:', error);
        setError('Error al cargar los datos del vendedor');
        setLoading(false);
      }
    };
    fetchSeller();
  }, [id]);

  const handleImageSelected = (file) => {
    setSelectedImage(file);
  };


  // Función para generar una contraseña aleatoria
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append('name', formData.name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('mail', formData.mail);
    formDataToSend.append('phone_number', formData.phone_number);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('martillerId', formData.martillerId);
    
    if (selectedImage) {
      formDataToSend.append('photo', selectedImage);  // Adjuntar la imagen solo si se seleccionó una nueva
    }

    try {
      await axios.put(`/seller/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(-1);
    } catch (error) {
      console.error('Error updating seller details:', error);
      setError('Error al actualizar los datos del vendedor');
    }
  };


  const handleBack = () => {
    navigate(-1);  // Navegar hacia atrás
  };

  if (loading) {
    return <p>Cargando vendedor...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.editFormWrapper}>
      <div className={styles.sellerInfo}>
        <img src={formData.photo || '/default-profile.png'} alt="Seller" className={styles.sellerImage} />
        <h2 className={styles.sellerName}>{formData.name} {formData.last_name}</h2>
      </div>

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
          <Label for="password">Contraseña</Label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              type={showPassword ? 'text' : 'password'}
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
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </Button>
              <Button
                type="button"
                color="secondary"
                className={styles.generateButton}
                style={{ marginLeft: '10px' }}
                onClick={generatePassword}
              >
                Generar Contraseña
              </Button>
            </div>
          </div>
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
          <ImageSeller onImageSelected={handleImageSelected} currentImage={selectedImage} />
        </FormGroup>

        
    <FormGroup>
      <Label for="martillerId">Martillero</Label>
      <Input
        type="select"
        name="martillerId"
        id="martillerId"
        className={styles.inputField}
        value={formData.martillerId}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona un Martillero</option>
        <option value="2">Abi Caon</option>
        <option value="4">Julieta Garcia</option>
      </Input>
    </FormGroup>

    
    <FormGroup>
      <Label for="status">Status</Label>
      <Input
        type="select"
        name="status"
        id="status"
        className={styles.inputField}
        value={formData.status}
        onChange={handleChange}
        required
      >
        <option value="true" >Activo</option>
        <option value="false">Inactivo</option>
      </Input>
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
