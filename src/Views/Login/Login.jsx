import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Actions/actions';
import style from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import titulo from '../../Assets/tituloNuevo.png'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(state => state.error); // Obtiene el error del estado global

  const [formData, setFormData] = useState({
    mail: '',
    password: ''
  });

  const { mail, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const success = await dispatch(login({ mail, password }));
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className={style.container}>
      <div clasname={style.imgContainer}>
      <img className={style.img} src={titulo} alt="" />
      </div>
      <div className={style.card}>
      <div className={style.content}>
      <h2 className={style.title}>Ingresar</h2>
      {error && <div className={style.error}>{error}</div>}
      <form className={style.form} onSubmit={onSubmit}>

          <label>Email:</label>
        <div className={style.formGroup}>
          <input
            type="email"
            name="mail"
            value={mail}
            onChange={onChange}
            required
            className={style.inputForm}
            />
        </div>
          <label>Contraseña:</label>
        <div className={style.formGroup}>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className={style.inputForm}
            />
        </div>
        <button  className={style.buttonSubmit} type="submit">Login</button>
      </form>
      <p className={style.forgotPassword}>
                        <a className={style.forgotPasswordLink} href="/recuperar-contraseña">Olvidé mi contraseña</a>
                    </p>
       </div>
       </div>
    </div>
  );
};

export default Login;
