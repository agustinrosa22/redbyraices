// actions.js
import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL } from './actionTypes';

export const login = ({ mail, password }) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3001/login', { mail, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data // Ajusta la respuesta según tu backend
    });
    return true;
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    dispatch({
      type: LOGIN_FAIL,
      payload: 'Credenciales inválidas' // Otra posibilidad: error.response.data.message
    });
    return false;
  }
};