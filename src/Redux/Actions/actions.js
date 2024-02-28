// actions.js
import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, GET_USER_SUCCESS, GET_USER_FAIL, CREATE_PROPERTY_SUCCESS, CREATE_PROPERTY_FAIL } from './actionTypes';

export const login = ({ mail, password }) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3001/login', { mail, password });
    const user = response.data.user;
    if (!user || !user.id) {
      throw new Error('ID de usuario no válido en la respuesta');
    }
    const userId = user.id;
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: user,
        userId: userId
      }
    });
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', userId);
    // console.log('Usuario guardado en localStorage:', user); 
    // Ahora puedes llamar a la acción getUser con el userId
    dispatch(getUser(userId));
    return true;
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    dispatch({
      type: LOGIN_FAIL,
      payload: 'Credenciales inválidas'
    });
    return false;
  }
};


export const getUser = userId => async dispatch => {
  try {
    // console.log('ID del usuario antes de obtener los detalles:', userId);
    if (!userId) {
      throw new Error('El ID del usuario no está definido');
    }
    
    const response = await axios.get(`http://localhost:3001/seller/${userId}`);
    // console.log('Detalles del usuario obtenidos del backend:', response.data);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: response.data // Ajustar la respuesta según tu backend
    });
  } catch (error) {
    console.error('Error al obtener los detalles del usuario:', error);
    dispatch({
      type: GET_USER_FAIL,
      payload: 'Error al obtener los detalles del usuario' // Otra posibilidad: error.response.data.message
    });
  }
};

export const createProperty = (propertyData, userId) => async (dispatch) => {
  try {
    // Incluye el userId como parte de los datos de la propiedad
    const dataWithUserId = { ...propertyData,};

    const response = await axios.post('http://localhost:3001/property', dataWithUserId);
    dispatch({
      type: CREATE_PROPERTY_SUCCESS,
      payload: response.data,
    });
    console.log('Propiedad creada:', response.data);
    // Manejar cualquier lógica adicional después de crear la propiedad
  } catch (error) {
    console.error('Error al crear la propiedad:', error);
    dispatch({
      type: CREATE_PROPERTY_FAIL,
      payload: 'Error al crear la propiedad',
    });
    // Manejar errores
  }
};