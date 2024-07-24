// actions.js
import axios from 'axios';
import { 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  GET_USER_SUCCESS, 
  GET_USER_FAIL, 
  CREATE_PROPERTY_SUCCESS, 
  CREATE_PROPERTY_FAIL, 
  GET_ALL_USERS_SUCCESS, 
  GET_ALL_USERS_FAIL, 
  UPDATE_MAP_LOCATION,
  GET_PROPERTIES_BY_SELLER_ID_SUCCESS,
  GET_PROPERTIES_BY_SELLER_ID_FAIL,
  EDIT_PROPERTY_REQUEST,
  EDIT_PROPERTY_SUCCESS,
  EDIT_PROPERTY_FAIL,
  GET_PROPERTY_BY_ID,
 } from './actionTypes';

export const login = ({ mail, password }) => async dispatch => {
  try {
    const response = await axios.post('/login', { mail, password });
    const user = response.data.user;
    if (!user || !user.id) {
      throw new Error('ID de usuario no válido en la respuesta');
    }
    const userId = user.id;
    const userType = user.type; 
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: user,
        userId: userId,
        userType: userType
      }
    });
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType);
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
    
    const response = await axios.get(`/seller/${userId}`);
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
      // console.log("documentos" + dataWithMedia.documentation)

  }
  else {
      console.error('Error al obtener las URLs de las imágenes del localStorage: imageUrls no es un array' );
      alert('Error al crear la propiedad. Por favor, revise los datos e intente nuevamente.');
      // console.log("prueba imagenes" + dataWithImages)
      dispatch({
        type: CREATE_PROPERTY_FAIL,
        payload: 'Error al obtener las URLs de las imágenes del localStorage: imageUrls no es un array',
      });
      return; // Salir de la función si imageUrls no es un array
    }

    const response = await axios.post('/property', { ...dataWithImages, ...dataWithMedia });

    dispatch({
      type: CREATE_PROPERTY_SUCCESS,
      payload: response.data,
    });
    // console.log('Propiedad creada:', response.data);
    localStorage.removeItem('uploadedImages');
    localStorage.removeItem('uploadedDocuments');
    // Manejar cualquier lógica adicional después de crear la propiedad

     // Mostrar alerta de éxito y redirigir a /home
     alert('Propiedad cargada con éxito');
     window.location.href = '/home';
  } catch (error) {
    console.error('Error al crear la propiedad:', error);
    alert('Error al crear la propiedad. Por favor, revise los datos e intente nuevamente.');
    dispatch({
      type: CREATE_PROPERTY_FAIL,
      payload: 'Error al crear la propiedad',
    });
    // Manejar errores

    
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('/users');
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


// Acción para obtener las propiedades relacionadas al vendedor por su id
export const getPropertiesBySellerId = (userId) => async (dispatch) => {
  if (!userId) {
    dispatch({
      type: GET_PROPERTIES_BY_SELLER_ID_FAIL,
      payload: 'El ID del usuario no está definido',
    });
    return; // Salir de la función si no hay userId
  }

  const userType = localStorage.getItem('userType'); // Recuperar el tipo de usuario desde localStorage

  try {
    let response;
    if (userType === 'MARTILLER') {
      response = await axios.get(`/properties/martiller/${userId}`);
    } else if (userType === 'Vendedor') {
      response = await axios.get(`/properties/seller/${userId}`);
    } else {
      throw new Error('Tipo de usuario desconocido');
    }

    dispatch({
      type: GET_PROPERTIES_BY_SELLER_ID_SUCCESS,
      payload: response.data.data,
    });
    // console.log('Propiedades obtenidas:', response.data.data);
  } catch (error) {
    console.error('Error al obtener las propiedades del vendedor:', error);
    dispatch({
      type: GET_PROPERTIES_BY_SELLER_ID_FAIL,
      payload: 'Error al obtener las propiedades del vendedor',
    });
  }
};

export const editProperty = (propertyId, propertyData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_PROPERTY_REQUEST });

    // Recuperar las URLs de las imágenes del localStorage
    const imageUrls = JSON.parse(localStorage.getItem('uploadedImages'));
    let dataWithImages = { ...propertyData }; // Declarar dataWithImages aquí

    // Recuperar las URLs de los documentos del localStorage
    const documentUrls = JSON.parse(localStorage.getItem('uploadedDocuments'));
    let dataWithMedia = { ...propertyData };

    if (Array.isArray(imageUrls)) {
      // Agregar las URLs de las imágenes al objeto de datos de la propiedad
      dataWithImages = {
        ...propertyData,
        photo: imageUrls // Suponiendo que la propiedad para las imágenes se llama "photo"
      };
    }
    if (Array.isArray(documentUrls)) {
      // Agregar las URLs de los documentos al objeto de datos de la propiedad
      dataWithMedia = {
        ...dataWithImages,
        documentation: documentUrls
      };
    }

    const response = await axios.put(`/properties/${propertyId}`, dataWithMedia);

    dispatch({
      type: EDIT_PROPERTY_SUCCESS,
      payload: response.data,
    });

    // Mostrar alerta de éxito y redirigir a /home
    alert('Propiedad editada con éxito');
    window.location.href = '/home';
  } catch (error) {
    console.error('Error al editar la propiedad:', error);
    alert('Error al editar la propiedad. Por favor, revise los datos e intente nuevamente.');
    dispatch({
      type: EDIT_PROPERTY_FAIL,
      payload: 'Error al editar la propiedad',
    });
  }
};

export const getPropertyById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/property/${id}`);
    dispatch({
      type: GET_PROPERTY_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    // Handle error accordingly
  }
};