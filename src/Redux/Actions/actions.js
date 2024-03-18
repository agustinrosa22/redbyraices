// actions.js
import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, GET_USER_SUCCESS, GET_USER_FAIL, CREATE_PROPERTY_SUCCESS, CREATE_PROPERTY_FAIL, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAIL, UPDATE_MAP_LOCATION } from './actionTypes';

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
    // Incluir el userId como parte de los datos de la propiedad
    const dataWithUserId = { ...propertyData};

    // Recuperar las URLs de las imágenes del localStorage
    const imageUrls = JSON.parse(localStorage.getItem('uploadedImages'));
    let dataWithImages; // Declarar dataWithImages aquí

     // Recuperar las URLs de los documentos del localStorage
     const documentUrls = JSON.parse(localStorage.getItem('uploadedDocuments'));
   
     let dataWithMedia = { ...dataWithUserId };

    if (Array.isArray(imageUrls)) {
      // Agregar las URLs de las imágenes al objeto de datos de la propiedad
      dataWithImages = {
        ...dataWithUserId,
        photo: imageUrls // Suponiendo que la propiedad para las imágenes se llama "images"
      };
      // console.log("prueba imagenes" + imageUrls)
    }
    if (Array.isArray(documentUrls)) {
      // Agregar las URLs de los documentos al objeto de datos de la propiedad
      dataWithMedia = {
        ...dataWithMedia,
        documentation: documentUrls
      };
      console.log("documentos" + dataWithMedia.documentation)
  }
  else {
      console.error('Error al obtener las URLs de las imágenes del localStorage: imageUrls no es un array' );
      console.log("prueba imagenes" + dataWithImages)
      dispatch({
        type: CREATE_PROPERTY_FAIL,
        payload: 'Error al obtener las URLs de las imágenes del localStorage: imageUrls no es un array',
      });
      return; // Salir de la función si imageUrls no es un array
    }

    const response = await axios.post('http://localhost:3001/property', { ...dataWithImages, ...dataWithMedia });

    dispatch({
      type: CREATE_PROPERTY_SUCCESS,
      payload: response.data,
    });
    console.log('Propiedad creada:', response.data);
    localStorage.removeItem('uploadedImages');
    localStorage.removeItem('uploadedDocuments');
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

export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/users');
    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: response.data.data,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    dispatch({
      type:  GET_ALL_USERS_FAIL,
      payload: 'Error al obtener los usuarios',
    });
    return null;
  }
};

export const updateMapLocation = (location) => ({
  type: UPDATE_MAP_LOCATION,
  payload: location,
});
