import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    mail: '',
    password: ''
  });

  const { mail, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', {
        mail,
        password
      });

      if (res.data.access) {
        console.log('Login exitoso');
        navigate('/home');
      } else if (res.message === "Credenciales inválidas") {
        console.log('Credenciales inválidas');
        setError('Credenciales inválidas');
      } else if (res.status === 404) {
        console.log('Usuario no encontrado');
        setError('Usuario no encontrado');
      } else {
        console.log('Error interno del servidor');
        setError('Error interno del servidor');
      }
    } catch (err) {
      console.error('Error interno del servidor:', err);
      setError('Error interno del servidor');
    }
  };

  return (
    <div className={style.container}>
      <h2>Login</h2>
      {error && <div className={style.error}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="mail"
            value={mail}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
