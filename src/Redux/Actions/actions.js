import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL } from './actionTypes';

export const login = ({ mail, password }) => async dispatch => {
  const body = JSON.stringify({ mail, password });

  try {
    const res = await axios.post('/login', body);

    if (res.data.access) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: res.data.message
      });
    }

    return res; // Devuelve la respuesta para poder manejarla en el componente Login
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data // Usa err.response para acceder a la respuesta del servidor
    });

    throw err; // Lanza el error nuevamente para manejarlo en el componente Login
  }
};
