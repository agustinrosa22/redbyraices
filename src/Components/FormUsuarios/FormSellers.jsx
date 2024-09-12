import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createUserSeller } from '../../Redux/Actions/actions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageSeller from '../ImageSeller/ImageSeller';
import style from './FormSellers.module.css'

const FormUsuarios = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    mail: '', // Solo la parte antes de @byraices.com
    password: '',
    name: '',
    last_name: '',
    phone_number: '',
    photo: '',
    type: 'Vendedor',
    status: true,
    martillerId: '',
    officeId: 1,
  });


  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef(null); // Usamos ref para controlar el cursor


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

  // Actualiza solo la parte antes de @byraices.com y evita modificar esa parte
  const handleEmailChange = (e) => {
    const value = e.target.value.replace('@byraices.com', ''); // Asegurar que no pueda escribir más allá de @byraices.com
    setFormData({
      ...formData,
      mail: value,
    });
  };

  // Mantener el cursor siempre antes de la terminación fija
  const handleEmailFocus = () => {
    const inputElement = emailInputRef.current; // Acceder al elemento DOM real
    if (inputElement && inputElement.setSelectionRange) {
      const position = formData.mail.length; // Pone el cursor al final de la parte editable
      inputElement.setSelectionRange(position, position); // Establecer la posición del cursor
    }
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Si el campo es "name" o "last_name", capitalizar la primera letra
    const capitalizedValue = (fieldValue) => {
      return fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1).toLowerCase();
    };
  
    setFormData({
      ...formData,
      [name]: name === 'name' || name === 'last_name' ? capitalizedValue(value) : value,
    });
  };
  

  const handleImageSelected = (imageUrl) => {
    setFormData({
      ...formData,
      photo: imageUrl,
    });
  };
  // Manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      mail: `${formData.mail}@byraices.com`, // Concatenar la terminación al enviar
    };

    dispatch(createUserSeller(dataToSubmit));
  };

  return (
    <Form onSubmit={handleSubmit} className={style.formContainer}>
    <FormGroup>
      <Label for="mail">Correo Electrónico</Label>
      <div className={style.mailContainer}>
        <Input
          type="text"
          name="mail"
          id="mail"
          className={style.inputField}
          innerRef={emailInputRef}
          value={formData.mail}
          onChange={handleEmailChange}
          onFocus={handleEmailFocus}
          required
        />
        <span className={style.emailSuffix}>@byraices.com</span>
      </div>
    </FormGroup>

    <FormGroup>
      <Label for="password">Contraseña</Label>
      <div className={style.passwordButtons}>
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          className={style.inputField}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button
          type="button"
          className={style.secondaryButton}
          onClick={toggleShowPassword}
        >
          {showPassword ? 'Ocultar' : 'Mostrar'}
        </Button>
        <Button
          type="button"
          className={style.secondaryButton}
          onClick={generatePassword}
        >
          Generar Contraseña
        </Button>
      </div>
    </FormGroup>

    <FormGroup>
      <Label for="name">Nombre</Label>
      <Input
        type="text"
        name="name"
        id="name"
        className={style.inputField}
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
        className={style.inputField}
        value={formData.last_name}
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
        className={style.inputField}
        value={formData.phone_number}
        onChange={handleChange}
        required
      />
    </FormGroup>

    <div className={style.imageContainer}>
      <ImageSeller onImageSelected={handleImageSelected} />
    </div>

    <FormGroup>
      <Label for="type">Tipo de Usuario</Label>
      <Input
        type="select"
        name="type"
        id="type"
        className={style.inputField}
        value={formData.type}
        onChange={handleChange}
      >
        <option value="Vendedor">Vendedor</option>
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="martillerId">Martillero</Label>
      <Input
        type="select"
        name="martillerId"
        id="martillerId"
        className={style.inputField}
        value={formData.martillerId}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona un Martillero</option>
        <option value="2">Abi Caon</option>
        <option value="4">Julieta Garcia</option>
      </Input>
    </FormGroup>

    <Button type="submit" className={style.primaryButton}>
      Crear Usuario
    </Button>
  </Form>

  );
};

export default FormUsuarios;
