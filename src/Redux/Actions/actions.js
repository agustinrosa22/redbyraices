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
  GET_PROPERTIES_PENDING_SUCCESS,
  GET_PROPERTIES_PENDING_FAIL,
  GET_PROPERTIES_LIST_SUCCESS,
  GET_PROPERTIES_LIST_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  GET_ALL_SELLERS_SUCCESS,
  GET_ALL_SELLERS_FAIL,
  UPDATE_SELLER_SUCCESS,
  UPDATE_SELLER_FAIL,
  UPDATE_SELLER_REQUEST,
  CREATE_VISITA_REQUEST,
  CREATE_VISITA_SUCCESS,
  CREATE_VISITA_FAIL,
  GET_ALL_VISITAS_REQUEST,
  GET_ALL_VISITAS_SUCCESS,
  GET_ALL_VISITAS_FAIL,
  GET_VISITAS_BY_PROPERTY_REQUEST,
  GET_VISITAS_BY_PROPERTY_SUCCESS,
  GET_VISITAS_BY_PROPERTY_FAIL,
  GET_PROPERTIES_BY_SELLER,
  GET_PROPERTIES_BY_SELLER_ERROR,
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

export const createProperty = (formData) => async (dispatch) => {
  try {
      dispatch({ type: 'CREATE_PROPERTY_REQUEST' });

      const config = {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      };

      // Enviar la solicitud POST al backend con los datos del formulario y las imágenes/documentos
      const { data } = await axios.post('https://server.byraices.com/property', formData, config);

      dispatch({
          type: 'CREATE_PROPERTY_SUCCESS',
          payload: data,
      });

      // Muestra mensaje de éxito o redirige a otra página si es necesario
      alert('Propiedad creada exitosamente!');
  } catch (error) {
      dispatch({
          type: 'CREATE_PROPERTY_FAIL',
          payload: error.response?.data?.message || error.message,
      });

      // Muestra el error si falla
      alert('Error al crear la propiedad');
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

    const response = await axios.put(`/properties/${propertyId}`, propertyData);
    dispatch({ type: EDIT_PROPERTY_SUCCESS, payload: response.data });

    alert('Propiedad editada con éxito');
    window.location.href = '/home';
  } catch (error) {
    console.error('Error al editar la propiedad:', error);
    alert('Error al editar la propiedad. Por favor, revise los datos e intente nuevamente.');
    dispatch({ type: EDIT_PROPERTY_FAIL, payload: 'Error al editar la propiedad' });
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

export const getPendingProperties = () => async (dispatch) => {
  try {
    const response = await axios.get('/properties/pending');
    console.log(response);
    dispatch({
      type: GET_PROPERTIES_PENDING_SUCCESS,
      payload: response.data.data, // Ajustar según la estructura de la respuesta
    });
  } catch (error) {
    console.error('Error al obtener propiedades pendientes:', error);
    dispatch({
      type: GET_PROPERTIES_PENDING_FAIL,
      payload: 'Error al obtener propiedades pendientes',
    });
  }
};

export const getListProperties = () => async (dispatch) => {
  try {
    const response = await axios.get('/properties/active');
    console.log(response);
    dispatch({
      type: GET_PROPERTIES_LIST_SUCCESS,
      payload: response.data, // Ajustar según la estructura de la respuesta
    });
  } catch (error) {
    console.error('Error al obtener propiedades activas:', error);
    dispatch({
      type:  GET_PROPERTIES_LIST_FAIL,
      payload: 'Error al obtener propiedades activas',
    });
  }
};


export const createUserSeller = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_REQUEST });

    // Llamada a la API para crear el usuario
    const response = await axios.post('/seller', userData);

    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: response.data,
    });

    alert('Usuario creado con éxito');
    // Redireccionar o realizar alguna acción adicional si es necesario
    window.location.href = '/home';
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload: error.message || 'Error al crear el usuario',
    });

    alert('Error al crear el usuario, por favor intente nuevamente.');
    console.error('Error al crear usuario:', error);
  }
};

// Action para obtener todos los vendedores
export const getAllSellers = () => async (dispatch) => {
  try {
    const response = await axios.get('/sellers');
    dispatch({
      type: GET_ALL_SELLERS_SUCCESS,
      payload: response.data // Asume que el servidor devuelve una lista de vendedores
    });
  } catch (error) {
    console.error('Error al obtener los vendedores:', error);
    dispatch({
      type: GET_ALL_SELLERS_FAIL,
      payload: error.message || 'Error al obtener los vendedores'
    });
  }
};

// Acción para actualizar un vendedor
export const updateSeller = (id, sellerData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SELLER_REQUEST });

    const response = await axios.put(`/sellers/${id}`, sellerData);
    dispatch({
      type: UPDATE_SELLER_SUCCESS,
      payload: response.data // Asume que el servidor devuelve el vendedor actualizado
    });

    alert('Vendedor actualizado con éxito');
    // Puedes redirigir o actualizar la UI según sea necesario
  } catch (error) {
    console.error('Error al actualizar el vendedor:', error);
    alert('Error al actualizar el vendedor. Por favor, revise los datos e intente nuevamente.');
    dispatch({
      type: UPDATE_SELLER_FAIL,
      payload: 'Error al actualizar el vendedor'
    });
  }
};

export const createVisita = (visitaData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_VISITA_REQUEST });

    const response = await axios.post('/visita', visitaData);

    dispatch({
      type: CREATE_VISITA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_VISITA_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Acción para obtener todas las visitas
export const getAllVisitas = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_VISITAS_REQUEST });

    const response = await axios.get('/visitas');

    dispatch({
      type: GET_ALL_VISITAS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_VISITAS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Acción para obtener visitas por propiedad
export const getVisitasByPropertyId = (propertyId) => async (dispatch) => {
  try {
    dispatch({ type: GET_VISITAS_BY_PROPERTY_REQUEST });

    const response = await axios.get(`/visitas/property/${propertyId}`);

    dispatch({
      type: GET_VISITAS_BY_PROPERTY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_VISITAS_BY_PROPERTY_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteProperty = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/property/delete/${id}`);
      dispatch({
        type: 'DELETE_PROPERTY',
        payload: id,
      });
    } catch (error) {
      console.error('Error eliminando la propiedad:', error);
    }
  };
};

export const getPropertiesBySeller = (sellerId) => async (dispatch) => {
  try {
    const response = await axios.get(`/properties/seller/true/${sellerId}`);
    // Suponiendo que la respuesta tiene un formato de 'data' para las propiedades
    dispatch({
      type: GET_PROPERTIES_BY_SELLER,
      payload: {
        sellerId,
        properties: response.data.data, // Ajusta según el formato de respuesta real
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Si no hay propiedades, simplemente despachamos una acción con un conteo de 0
      dispatch({
        type: GET_PROPERTIES_BY_SELLER,
        payload: {
          sellerId,
          properties: [], // Asignar un array vacío si no se encuentran propiedades
        },
      });
    } else {
      // Manejar otros errores
      console.error('Error al obtener propiedades:', error);
      dispatch({
        type: GET_PROPERTIES_BY_SELLER_ERROR,
        payload: error.message,
      });
    }
  }
};