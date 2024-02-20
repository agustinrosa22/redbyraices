import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Actions/actions';
import style from './Login.module.css';
import { useNavigate } from 'react-router-dom';

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
